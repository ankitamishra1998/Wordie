import requests
from bs4 import BeautifulSoup
import json

# Get the list of words from json file
# with open('../wordies.json', 'r') as f:
#     jsonFile = json.load(f)

# words = jsonFile["words"]

words = [ 'Consummate' ]

url = 'https://www.merriam-webster.com/dictionary/'

dictionary = {}
meanings = []

# Iterate over the list of words
for word in words:
    response = requests.get(url + word)

    soup = BeautifulSoup(response.content, 'html.parser')
    # definitions = soup.find_all('span', class_='dtText')
    # partsOfSpeech = soup.find_all('h2', class_='parts-of-speech')
    entries = soup.find_all('div', class_='entry-word-section-container')
    
    '''
    insteas of doing this you can get the labels and the meaning then only extract
    the meaning where the label is 1
    '''

    for entry in entries:
        print(entry.attrs)
        for child in entry.children:
            if child.name:
                if child.attrs:
                    #print(child.attrs)
                    childClass = child.attrs.get('class', None)
                    if childClass:
                        #print(childClass)
                        if childClass[0] == 'vg':
                            for gchild in child.children:
                                if gchild.name:
                                    if gchild.attrs:
                                        gchildClass = gchild.attrs.get('class', None)
                                        if gchildClass[0] == 'vg-sseq-entry-item':
                                            #print(gchild.attrs)
                                            for ggchild in gchild.children:
                                                if ggchild.name:
                                                    if ggchild.attrs:
                                                        ggchildClass = ggchild.attrs.get('class', None)
                                                        if ggchildClass:
                                                           if ggchildClass[0] == 'sb':
                                                               for gggchild in ggchild.children:
                                                                if gggchild.name:
                                                                    if gggchild.attrs:
                                                                        gggchildClass = gggchild.attrs.get('class', None)
                                                                        if gggchildClass[0] == 'sb-0':
                                                                            for ggggchild in gggchild.children:
                                                                                if ggggchild.name:
                                                                                    if ggggchild.attrs:
                                                                                        ggggchildClass = ggggchild.attrs.get('class', None)
                                                                                        if ggggchildClass:
                                                                                            print(ggggchild.attrs)
                                                                            
                                            break
                            break
                                

    # if partsOfSpeech:
    #     for type in partsOfSpeech:
    #         print(type.text.strip())

    # if definitions:
    #     for definition in definitions:
    #         meanings.append({
    #             "definition": definition.text.strip()[2:]
    #         })
    
    dictionary[word] = meanings

# Print the meanings of the words
pretty_json = json.dumps(dictionary, indent=4)
print(pretty_json)

