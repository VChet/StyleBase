export default {
  styles: [],
  isLoading: true,
  pagination: {
    page: 1,
    hasNextPage: false
  },

  searchQuery: '',
  ownerFilter: '',

  sortOptions: [
    {
      id: 'stargazers',
      text: 'Most liked'
    },
    {
      id: 'lastUpdate',
      text: 'Recently updated'
    },
    {
      id: '_id',
      text: 'Recently added'
    }
  ],
  sortOrder: 'stargazers',

  selectedStyle: {},
  showStyleInfoModal: false
};
