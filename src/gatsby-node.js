const fetch = require('node-fetch');
const capitalizeName = require('./helpers/capitalize');

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions;

  // Gatsby adds a configOption that's not needed for this plugin, delete it

  delete configOptions.plugins;

  /**
   * Custom URL's
   *
   * @returns {Node} - Gatsby Node
   */
  if (configOptions.customUrls) {
    for (const key in configOptions.customUrls) {
      const customUrlName = key;
      const apiUrl = configOptions.customUrls[key];
      const response = await fetch(apiUrl);
      const { data } = await response.json();

      data.forEach((item) => {
        const customUrlNameCapitalized = capitalizeName(customUrlName);

        createNode({
          ...item,
          id: createNodeId(`${customUrlNameCapitalized}-${item.id}`),
          parent: null,
          children: [],
          internal: {
            type: `${customUrlNameCapitalized}`,
            content: JSON.stringify(item),
            contentDigest: createContentDigest(item),
          },
        });
      });
    }
  }

  /**
   * Collections
   *
   * @returns {Node} - Gatsby Node
   */
  if (configOptions.collections && configOptions.collections.length) {
    for (let i = 0; i < configOptions.collections.length; i++) {
      const collectionName = configOptions.collections[i];
      const apiUrl = `${configOptions.baseUrl}/${configOptions.apiUrl}/collections/${collectionName}/entries`;
      const response = await fetch(apiUrl);
      const { data } = await response.json();

      data.forEach((item) => {
        const collectionNameCapitalized = capitalizeName(collectionName);

        createNode({
          ...item,
          id: createNodeId(`${collectionNameCapitalized}-${item.id}`),
          parent: null,
          children: [],
          internal: {
            type: `Collection${collectionNameCapitalized}`,
            content: JSON.stringify(item),
            contentDigest: createContentDigest(item),
          },
        });
      });
    }
  }

  /**
   * Taxonomies
   *
   * @returns {Node} - Gatsby Node
   */
  if (configOptions.taxonomies && configOptions.taxonomies.length) {
    for (let i = 0; i < configOptions.taxonomies.length; i++) {
      const taxonomyName = configOptions.taxonomies[i];
      const apiUrl = `${configOptions.baseUrl}/${configOptions.apiUrl}/taxonomies/${taxonomyName}/terms`;
      const response = await fetch(apiUrl);
      const { data } = await response.json();

      data.forEach((item) => {
        const taxonomyNameCapitalized = capitalizeName(taxonomyName);

        createNode({
          ...item,
          id: createNodeId(`${taxonomyNameCapitalized}-${item.id}`),
          parent: null,
          children: [],
          internal: {
            type: `Taxonomy${taxonomyNameCapitalized}`,
            content: JSON.stringify(item),
            contentDigest: createContentDigest(item),
          },
        });
      });
    }
  }

  /**
   * Globals
   *
   * @returns {Node} - Gatsby Node
   */
  if (configOptions.globals) {
    const apiUrl = `${configOptions.baseUrl}/${configOptions.apiUrl}/globals`;
    const response = await fetch(apiUrl);
    const { data } = await response.json();

    data.forEach((item) => {
      createNode({
        ...item,
        id: createNodeId(`Global`),
        parent: null,
        children: [],
        internal: {
          type: `Globals`,
          content: JSON.stringify(item),
          contentDigest: createContentDigest(item),
        },
      });
    });
  }

  /**
   * Users
   *
   * @returns {Node} - Gatsby Node
   */
  if (configOptions.users) {
    const apiUrl = `${configOptions.baseUrl}/${configOptions.apiUrl}/users`;
    const response = await fetch(apiUrl);
    const { data } = await response.json();

    data.forEach((user) => {
      createNode({
        ...user,
        id: createNodeId(`User-${user.id}`),
        parent: null,
        children: [],
        internal: {
          type: `Users`,
          content: JSON.stringify(user),
          contentDigest: createContentDigest(user),
        },
      });
    });
  }

  /**
   * Assets
   *
   * @returns {Node} - Gatsby Node
   */
  if (configOptions.assets && configOptions.assets.length) {
    for (let i = 0; i < configOptions.assets.length; i++) {
      const assetName = configOptions.assets[i];
      const apiUrl = `${configOptions.baseUrl}/${configOptions.apiUrl}/assets/${assetName}`;
      const response = await fetch(apiUrl);
      const { data } = await response.json();

      data.forEach((item) => {
        const assetNameCapitalized = capitalizeName(assetName);

        createNode({
          ...item,
          id: createNodeId(`${assetNameCapitalized}-${item.id}`),
          parent: null,
          children: [],
          internal: {
            type: `Assets${assetNameCapitalized}`,
            content: JSON.stringify(item),
            contentDigest: createContentDigest(item),
          },
        });
      });
    }
  }
};
