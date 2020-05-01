# Gatsby Source Statamic

A [Gatsby](https://www.gatsbyjs.org/) source plugin for [Statamic 3](https://statamic.dev/) which will allow you to pull
data from Statamic's [Content API](https://statamic.dev/rest-api) into your Gatsby site.

## Install

```bash
  npm i gatsby-source-statamic -S
```

## How to use

Sample Config

```javascript
// In your gatsby-config.js
plugins: [
{
  resolve: `gatsby-source-statamic`,
  options: {
    // The rest api route prefix that your Statamic site is using.
    // If not set, it uses the default of 'api'
    // https://statamic.dev/rest-api#customizing-the-api-url
    restApiRoutePrefix: 'api',
    /*
     * The base URL of the Statamic site without the trailing slash. This is required.
     * Example : 'http://statamic-docs.test'
     */
    baseUrl: `http://statamic-docs.test`,
    customUrls: {
      fieldtypesTitlesSortedReverse:
        'http://statamic-docs.test/api/collections/fieldtypes/entries?sort=-title',
    },
    collections: [
      'docs',
      'fieldtypes',
      'knowledge-base',
      'modifiers',
      'tags',
      'variables',
    ],
    taxonomies: ['tags', 'types'],
    globals: true,
    users: true,
    assets: ['main'],
  },
},
```

## Config options

| Key         | Value                                                                                                             | Required |
| ----------- | ----------------------------------------------------------------------------------------------------------------- | -------- |
| apiUrl      | `String`: the API URL                                                                                             | Yes      |
| baseUrl     | `String`: the base URL of your Statamic site                                                                      | Yes      |
| customUrls  | `Object`: Allows you to add custom URL's to take advantage of Statamtic's filtering, sorting and pagination, etc. | No       |
| collections | `Array[String]`: names of your Statamic Collections                                                               | No       |
| taxonomies  | `Array[String]`: names of your Statamic Taxonomies                                                                | No       |
| globals     | `Boolean`: if true, adds Statamic Globals                                                                         | No       |
| users       | `Boolean`: if true, adds Statamic Users                                                                           | No       |
| assets      | `Array[String]`: names of your Statamic Assets                                                                    | No       |

## How to query

Get all of the titles from the 'docs' collection sorted in ASC order

```javascript
query MyQuery {
  allCollectionDocs(sort: {fields: [title], order: ASC}) {
    edges {
      node {
        title
      }
    }
  }
}
```

## GraphQL Naming

The naming conventions for various Statamic resources within GraphQL are as follows (using the example config above):

| Statamic Resource | GraphQL Name                                                              |
| ----------------- | ------------------------------------------------------------------------- |
| customURLS        | the `key` of the customURLS object: ie `allFieldtypesTitlesSortedReverse` |
| collections       | `allCollectionDocs`, `allCollectionKnowledgeBase`, etc.                   |
| taxonomies        | `allTaxonomyTags`, `allTaxonomyTypes`                                     |
| globals           | `allGlobals`                                                              |
| users             | `allUsers`                                                                |
| assets            | `allAssetsMain`                                                           |
