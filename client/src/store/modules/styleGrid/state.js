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
      id: '_id',
      text: 'Recently added'
    },
    {
      id: 'lastUpdate',
      text: 'Recently updated'
    },
    {
      id: 'stargazers',
      text: 'Most liked'
    }
  ],
  sortOrder: '_id',

  selectedStyle: {},
  showStyleInfoModal: false
};
