export const getLedetekst = (text: string, data: any): string => {
    if (text === undefined || data === undefined) {
        return '';
    }
    let newtext = text;
    Object.keys(data).forEach(key => {
        const regex = new RegExp(key, 'g');
        newtext = newtext.replace(regex, data[key]);
    });
    return newtext;
};
