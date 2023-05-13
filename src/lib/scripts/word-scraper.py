import requests
from bs4 import BeautifulSoup
import json

'''

'''

def getWords():
    with open('../wordies.json', 'r') as f:
        jsonFile = json.load(f)

    words = jsonFile["words"]

    return words

def formatSentence(usage, subContent):
    for sub in subContent:
        if sub in usage:
            return "| " + sub


def formatElement(element, examplelist, partOfSpeech):
    meaningObject = {}
    meaningObject['partOfSpeech'] = partOfSpeech

    for i in range(len(element)):
        if element[i] == '1':
            cur_idx = i
            if len(element[cur_idx+1]) == 1:
                cur_idx += 1
            if cur_idx + 2 < len(element):
                if element[cur_idx+1][0] == ":"
                    meaningObject['firstUsage'] = element[cur_idx+1]
                    meaningObject['firstSentence'] = formatSentence(element[cur_idx+2], examplelist)
            else:
                if cur_idx + 1 < len(element):
                    if element[cur_idx+1][0] == ":"
                        meaningObject['firstUsage'] = element[cur_idx+1]

        if element[i] == '2':
            cur_idx = i
            if len(element[cur_idx+1]) == 1:
                cur_idx += 1
            if cur_idx + 2 < len(element):
                if element[cur_idx+1][0] == ":"
                    meaningObject['secondUsage'] = element[cur_idx+1]
                    meaningObject['secondSentence'] = formatSentence(element[cur_idx+2], examplelist)
            else:
                if cur_idx + 1 < len(element):
                    if element[cur_idx+1][0] == ":"
                        meaningObject['secondUsage'] = element[cur_idx+1]
            

    return meaningObject

def scrapeWords(wordsList):
    dictionary = {}
    url = 'https://www.merriam-webster.com/dictionary/'

    for word in wordsList:
        print(f"Word: {word}")
        print("\n")
        response = requests.get(url + word)
        soup = BeautifulSoup(response.content, 'html.parser')
        meanings = []

        listofelements = []
        examplelist = []
        partsOfSpeechList = []
        dictEntry = soup.find_all('div', class_='entry-word-section-container')
        partsOfSpeech = soup.find_all('h2', class_='parts-of-speech')
        examples = soup.find_all('div', class_='sub-content-thread')

        for partOfSpeech in partsOfSpeech:
            partsOfSpeechList.append(partOfSpeech.text.strip())

        print(f"Parts of Speech: {partsOfSpeechList}")
        print("\n")
        for entry in dictEntry:
            listofelements.append(entry.text.strip())

        for example in examples:
            examplelist.append(example.text.strip())

        for i in range(len(listofelements)):
            words = listofelements[i].split("\n")
            filtered_words = [x for x in words if (x != '' and x != ' ')]
            mapped_words = [word.strip() for word in filtered_words]
            print(f"Element: {mapped_words}")
            print("\n")

            partOfSpeech = None
            if len(partsOfSpeechList) > i:
                partOfSpeech = partsOfSpeechList[i]
            meaningObject = formatElement(mapped_words, examplelist, partOfSpeech)
            meanings.append(meaningObject)

        dictionary[word] = meanings

    return dictionary

def printDictionary(dictionary):
    pretty_json = json.dumps(dictionary, indent=4)
    print(pretty_json)

def writeToFile(dictionary):
    with open("../meanings.json", "w") as f:
        json.dump(dictionary, f)

def main():
    words = getWords()
    dictionary = scrapeWords(words)
    #printDictionary(dictionary)
    writeToFile(dictionary)

if __name__ == '__main__':
    main()