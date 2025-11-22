import { GraphQLClient } from 'graphql-request';

const ANILIST_API_URL = 'https://graphql.anilist.co';

export const anilistClient = new GraphQLClient(ANILIST_API_URL);

export const setAnilistToken = (token: string) => {
  anilistClient.setHeader('Authorization', `Bearer ${token}`);
};

export const GRAPHQL_QUERIES = {
  VIEWER: `
    query Viewer {
      Viewer {
        id
        name
        avatar {
          large
        }
        bannerImage
        statistics {
          anime {
            count
            minutesWatched
            episodesWatched
          }
          manga {
            count
            chaptersRead
            volumesRead
          }
        }
      }
    }
  `,
  MEDIA_LIST: `
    query MediaList($userId: Int, $type: MediaType, $status: MediaListStatus) {
      MediaListCollection(userId: $userId, type: $type, status: $status) {
        lists {
          name
          entries {
            id
            media {
              id
              title {
                romaji
                english
                native
              }
              coverImage {
                large
              }
              episodes
              chapters
              format
              status
              averageScore
              genres
            }
            status
            score
            progress
            updatedAt
          }
        }
      }
    }
  `,
  USER_ACTIVITY: `
    query UserActivity($userId: Int, $page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        activities(userId: $userId, sort: ID_DESC) {
          ... on ListActivity {
            id
            type
            createdAt
            status
            progress
            media {
              id
              title {
                romaji
              }
              coverImage {
                medium
              }
            }
          }
        }
      }
    }
  `
};
