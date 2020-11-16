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
      text: 'add'
    },
    {
      id: 'lastUpdate',
      text: 'update'
    },
    {
      id: 'stargazers',
      text: 'stars'
    }
  ],
  sortOrder: '_id',

  selectedStyle: {},
  showStyleInfoModal: false
};
