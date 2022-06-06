export const formatString = (myStr: string): string => {
    const newString = `${myStr.substring(0, myStr.length - 1)},${myStr.substring(myStr.length - 3)}`
    return newString
}
