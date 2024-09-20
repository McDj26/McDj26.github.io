import type { Reactive } from "vue";
import { type algoliaTypes } from "./algoliaTypes";
export const translations: Reactive<algoliaTypes.DocSearchTranslations> =
  reactive({
    button: {
      buttonText: "搜索",
      buttonAriaLabel: "搜索",
    },
    modal: {
      searchBox: {
        resetButtonTitle: "重置",
        resetButtonAriaLabel: "重置",
        cancelButtonText: "取消",
        cancelButtonAriaLabel: "取消",
      },
      startScreen: {
        recentSearchesTitle: "历史搜索",
        noRecentSearchesText: "",
        saveRecentSearchButtonTitle: "保存搜索记录",
        removeRecentSearchButtonTitle: "清空搜索记录",
        favoriteSearchesTitle: "",
        removeFavoriteSearchButtonTitle: "",
      },
      errorScreen: {
        titleText: "无法加载结果",
        helpText: "你可能需要检查你的网络连接",
      },
      footer: {
        selectText: "选择",
        selectKeyAriaLabel: "选择",
        navigateText: "导航",
        navigateUpKeyAriaLabel: "向上",
        navigateDownKeyAriaLabel: "向下",
        closeText: "关闭",
        closeKeyAriaLabel: "关闭",
        searchByText: "搜索提供商",
      },
      noResultsScreen: {
        noResultsText: "无法找到结果",
        suggestedQueryText: "你可以尝试查询",
        reportMissingResultsText: "报告缺少结果",
        reportMissingResultsLinkText: "点击报告",
      },
    },
  });
