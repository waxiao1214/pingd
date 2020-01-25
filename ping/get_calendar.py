import icalendar
import json
from selenium import webdriver
import re
import numpy as np
import os


def get_async_birthdays(browser):
    """ Returns list of birthday objects by querying the Facebook birthday async page """

    FACEBOOK_BIRTHDAY_ASYNC_ENDPOINT = 'https://www.facebook.com/async/birthdays/?'

    birthdays = []

    next_12_months_epoch_timestamps = get_next_12_month_epoch_timestamps()

    for epoch_timestamp in next_12_months_epoch_timestamps:
        print('Processing birthdays for month {0}'.format(datetime.fromtimestamp(epoch_timestamp).strftime("%B")))

        # Not all fields are required for response to be given, required fields are date, fb_dtsg_ag and __a
        query_params = {'date': epoch_timestamp,
                        'fb_dtsg_ag': get_async_token(browser),
                        '__a': '1'}

        response = browser.get(FACEBOOK_BIRTHDAY_ASYNC_ENDPOINT + urllib.parse.urlencode(query_params))

        if response.status_code != 200:
            logger.debug(response.text)
            print('Failed to get async birthday response. Params: {0}. Status code: {1}.'.format(query_params, response.status_code))
            raise SystemError

        birthdays_for_month = parse_birthday_async_output(browser, response.text)
        birthdays.extend(birthdays_for_month)
        print('Found {0} birthdays for month {1}'.format(len(birthdays_for_month),datetime.fromtimestamp(epoch_timestamp).strftime("%B")))

    return birthdays

def get_fb_calendar(usr, pss, loc=os.getcwd()):

    options = webdriver.ChromeOptions()

    # Save to a specific place that can be retrieved in here
    options.add_argument("--start-maximized")
    prefs = {"download.default_directory": loc,
             "directory_upgrade": True}
    options.add_experimental_option("prefs", prefs)

    # Pull from FB
    browser = webdriver.Chrome(chrome_options=options)

    browser.get('https://facebook.com')

    elem = browser.find_element_by_id('email')
    elem.send_keys(usr)

    elem = browser.find_element_by_id('pass')
    elem.send_keys(pss)

    elem = browser.find_element_by_id('loginbutton')
    elem.click()

    get_async_birthdays(browser)
    # browser.get('https://www.facebook.com/events/calendar/')
    #
    # dash = browser.find_element_by_id('events_dashboard_export')
    # # Kinda just iterate through all potential calendar links
    # link_elem = dash.find_elements_by_xpath("//*[contains(text(), 'Upcoming Events')]")
    # print(len(link_elem))
    # for i in link_elem:
    #     link = i.get_property("href")
    #     try:
    #         if 'ical' in link:
    #             ical = link
    #             browser.get(ical)
    #             break
    #     except TypeError:
    #         continue

    # try:
    #     dash = browser.find_element_by_id('events_dashboard_export')
    #     link_elem = dash.find_element_by_xpath("//*[contains(text(), 'Upcoming Events')]")
    #     ical = link_elem.get_property("href")
    #     browser.get(ical)  # This downloads the calendar
    # except:
    #     print("Couldn't find Upcoming Events link")
    #     return False

    # Parse ical for usable birthdays
    uid = re.findall(r'uid=([0-9]+)&', ical)[0]
    print(uid)

    g = open(loc+'/u{}.ics'.format(uid), 'rb')
    # g = open('/Users/adambrownell/Downloads/u{}.ics'.format(uid), 'rb')
    gcal = icalendar.Calendar.from_ical(g.read())

    birthdays = dict()
    for i in range(1, len(gcal.walk())):
        t = gcal.walk()[i]
        birthdays[i] = {"date": str(t['DTSTART'].dt), "title": str(t['SUMMARY'])}

    # print(birthdays[5])

    print(birthdays)
    # g.close()
    #
    # with open('assets/bdays.json', 'r') as infile:
    #     bdays = json.load(infile)
    # print(bdays['6'])
    #
    # print("Ok!")


if __name__ == '__main__':
    print('yes')
    get_fb_calendar('adam1brownell@yahoo.com', 'slakdodo123')
