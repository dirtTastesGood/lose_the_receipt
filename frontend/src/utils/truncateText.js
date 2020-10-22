export default (text, max=10) => {
  return text.length < max ? text : text.substr(0,max) + '...'
}