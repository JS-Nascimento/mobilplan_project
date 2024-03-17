export function capitalizeFirstLetter(string : string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
export function capitalizeAllFirstLetters(string : string) {
    if (!string) return '';
    return string
        .split(' ')
        .map((word) => capitalizeFirstLetter(word))
        .join(' ');
}