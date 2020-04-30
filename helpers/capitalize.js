/**
 * A helper function that capitalizes the first letter of a name.
 * If there is a hyphen in the name, each word is capitalized and join back together.
 *
 * ie: 'knowledge-base' becomes 'KnowledgeBase'
 *
 * @param {String} name - the name to be capitalized
 * @returns {String} - the capitalized name
 */
const capitalizeName = (name) => {
  if (name.indexOf('-') !== -1) {
    let capitalNames = [];
    const nameSplit = name.split('-');

    nameSplit.forEach((name) => {
      capitalNames.push(name.charAt(0).toUpperCase() + name.slice(1));
    });

    return capitalNames.join('');
  } else {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
};

module.exports = capitalizeName;
