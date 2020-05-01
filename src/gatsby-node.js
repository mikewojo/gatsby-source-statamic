const fetchStatamicResource = require('./helpers/fetchStatamicResource');
const capitalizeName = require('./helpers/capitalize');
const normalizeBaseUrl = require(`./helpers/normalize-base-url`);

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

  /**
   * Custom URL's
   *
   * @returns {Node} - Gatsby Node
   */
  if (customUrls) {
    for (const key in customUrls) {
      const customUrlName = key;
      const data = await fetchStatamicResource(customUrls[key]);

      if (data) {
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
  }

  /**
   * Collections
   *
   * @returns {Node} - Gatsby Node
   */
  if (collections && collections.length) {
    for (let i = 0; i < collections.length; i++) {
      try {
        const collectionName = collections[i];
        const apiUrl = `${normalizedBaseUrl}/${restApiRoutePrefix}/collections/${collectionName}/entries`;
        const data = await fetchStatamicResource(apiUrl);

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
      } catch (e) {
        httpExceptionHandler(e);
      }
    }
  }

  /**
   * Taxonomies
   *
   * @returns {Node} - Gatsby Node
   */
  if (taxonomies && taxonomies.length) {
    for (let i = 0; i < taxonomies.length; i++) {
      try {
        const taxonomyName = taxonomies[i];
        const apiUrl = `${normalizedBaseUrl}/${restApiRoutePrefix}/taxonomies/${taxonomyName}/terms`;
        const data = await fetchStatamicResource(apiUrl);

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
      } catch (error) {
        httpExceptionHandler(e);
      }
    }
  }

  /**
   * Globals
   *
   * @returns {Node} - Gatsby Node
   */
  if (globals) {
    try {
      const apiUrl = `${normalizedBaseUrl}/${restApiRoutePrefix}/globals`;
      const data = await fetchStatamicResource(apiUrl);

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
    } catch (e) {
      httpExceptionHandler(e);
    }
  }

  /**
   * Users
   *
   * @returns {Node} - Gatsby Node
   */
  if (users) {
    try {
      const apiUrl = `${normalizedBaseUrl}/${restApiRoutePrefix}/users`;
      const data = await fetchStatamicResource(apiUrl);

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
    } catch (e) {
      httpExceptionHandler(e);
    }
  }

  /**
   * Assets
   *
   * @returns {Node} - Gatsby Node
   */
  if (assets && assets.length) {
    for (let i = 0; i < assets.length; i++) {
      try {
        const assetName = assets[i];
        const apiUrl = `${normalizedBaseUrl}/${restApiRoutePrefix}/assets/${assetName}`;
        const data = await fetchStatamicResource(apiUrl);

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
      } catch (e) {
        httpExceptionHandler(e);
      }
    }
  }
};
