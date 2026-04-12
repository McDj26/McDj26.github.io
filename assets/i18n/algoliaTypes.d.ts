export namespace algoliaTypes {
  export interface DocSearchTranslations {
    button: {
      buttonText: string;
      buttonAriaLabel: string;
    };
    modal: {
      searchBox: {
        resetButtonTitle: string;
        resetButtonAriaLabel: string;
        cancelButtonText: string;
        cancelButtonAriaLabel: string;
      };
      startScreen: {
        recentSearchesTitle: string;
        noRecentSearchesText: string;
        saveRecentSearchButtonTitle: string;
        removeRecentSearchButtonTitle: string;
        favoriteSearchesTitle: string;
        removeFavoriteSearchButtonTitle: string;
      };
      errorScreen: {
        titleText: string;
        helpText: string;
      };
      footer: {
        selectText: string;
        selectKeyAriaLabel: string;
        navigateText: string;
        navigateUpKeyAriaLabel: string;
        navigateDownKeyAriaLabel: string;
        closeText: string;
        closeKeyAriaLabel: string;
        searchByText: string;
      };
      noResultsScreen: {
        noResultsText: string;
        suggestedQueryText: string;
        reportMissingResultsText: string;
        reportMissingResultsLinkText: string;
      };
    };
  }
}
