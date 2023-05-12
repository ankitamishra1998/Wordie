import requests
from bs4 import BeautifulSoup
import json

def getWords():
    with open('../wordies.json', 'r') as f:
        jsonFile = json.load(f)

    words = jsonFile["words"]

    return words

def isMonth(word):
    months = ['Jan ', 'Feb ', 'Mar ', 'Apr ', 'May ', 'Jun ', 'Jul ', 'Aug ', 'Sep ', 'Oct ', 'Nov ', 'Dec ']
    for month in months:
        if month in word:
            return True
    return False

def scrapeWotd():
    url = "https://www.merriam-webster.com/word-of-the-day/calendar"

    wordsList = []
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    words = soup.find_all('ul', class_="more-wod-items")

    for word in words:
        wordItem = word.text.strip()
        wordItemList = wordItem.split("\n")
        filtered_words = [x for x in wordItemList if (x != '' and x != ' ' and not isMonth(x))]
        mapped_words = [word.strip() for word in filtered_words]
        wordsList = wordsList + mapped_words

    return wordsList

def setUniqueWordList():
    words1 = getWords()
    words2 = scrapeWotd()
    words3 = words1 + words2
    words3 = list(set(words3))

    wordies = {}
    wordies["words"] = words3

    print(len(words3))
    print(words3)

    with open("../wordies.json", "w") as f:
        json.dump(wordies, f)


def main():
    setUniqueWordList()

if __name__ == '__main__':
    main()