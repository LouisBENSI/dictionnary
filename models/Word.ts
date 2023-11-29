export interface Word {
    title: string;
    message: string;
    resolution : string;
    word: string;
    phonetics: [{
        text: string;
        audio: string;
    }];
    meanings: [
        {
            partOfSpeech: string;
            definitions: [
                {
                    definition: string;
                    example: string;
                    "synonyms": [],
                }
            ],
            synonyms : []
        }
    ]
}