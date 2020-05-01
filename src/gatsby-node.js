const fetch = require('node-fetch');
const capitalizeName = require('./helpers/capitalize');
const httpExceptionHandler = require(`./helpers/http-exception-handler`);

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  {
    restApiRoutePrefix = 'api',
    baseUrl,
    customUrls,
    collections,
    taxonomies,
    globals,
    users,
    assets,
  }
) => {
  const { createNode } = actions;
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);

  // Gatsby adds a configOption that's not needed for this plugin, delete it

  delete configOptions.plugins;

  /**
   * Custom URL's
   *
   * @returns {Node} - Gatsby Node
   */
  if (customUrls) {
    for (const key in customUrls) {
      const customUrlName = key;
      const apiUrl = customUrls[key];

      try {
        const response = await fetch(apiUrl);
      } catch (e) {
        httpExceptionHandler(e);
      }

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
  if (collections && collections.length) {
    for (let i = 0; i < collections.length; i++) {
      const collectionName = collections[i];
      const apiUrl = `${normalizedBaseUrl}/${restApiRoutePrefix}/collections/${collectionName}/entries`;
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
  if (taxonomies && taxonomies.length) {
    for (let i = 0; i < taxonomies.length; i++) {
      const taxonomyName = taxonomies[i];
      const apiUrl = `${normalizedBaseUrl}/${restApiRoutePrefix}/taxonomies/${taxonomyName}/terms`;
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
  if (globals) {
    const apiUrl = `${normalizedBaseUrl}/${restApiRoutePrefix}/globals`;
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
  if (users) {
    const apiUrl = `${normalizedBaseUrl}/${restApiRoutePrefix}/users`;
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
  if (assets && assets.length) {
    for (let i = 0; i < assets.length; i++) {
      const assetName = assets[i];
      const apiUrl = `${normalizedBaseUrl}/${restApiRoutePrefix}/assets/${assetName}`;
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
