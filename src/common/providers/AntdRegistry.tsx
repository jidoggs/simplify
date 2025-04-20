import React from "react";
import {
  createCache,
  extractStyle,
  StyleProvider,
} from "@ant-design/cssinjs/lib";
import type Entity from "@ant-design/cssinjs/es/Cache";
import { ConfigProvider, ThemeConfig } from "antd";
import { customThemeColor } from "../../config/contants";

const { primary, gray, white } = customThemeColor;

const appTheme: ThemeConfig = {
  token: {
    colorPrimary: primary[100],
    colorPrimaryHover: primary[200],
    colorTextHeading: gray[300],
    colorTextLabel: gray[300],
    colorTextPlaceholder: gray[100],
    colorTextSecondary: gray[100],
    colorText: gray[200],
    colorFillTertiary: gray[600],
    fontFamily: "inherit",
  },
  components: {
    Form: {
      fontWeightStrong: 500,
    },
    Button: {
      fontSize: 16,
      paddingInline: 16,
      controlHeight: 42,
      borderRadius: 8,
      lineHeight: 1,
      algorithm: true,

      defaultBg: white[100],

      defaultColor: primary[100],
      defaultBorderColor: primary[100],

      colorBgTextHover: primary[100],

      colorPrimary: primary[100],
      colorPrimaryHover: primary[200],
      colorPrimaryActive: primary[400],

      colorText: primary[100],
      textHoverBg: gray[500],
      colorBgTextActive: primary[400],
      colorTextDisabled: white[100],
    },
    Input: {
      paddingBlock: 10,
      paddingInline: 15,
      borderRadius: 8,
      fontSize: 16,
      colorText: gray[100],
      colorBgContainer: gray[800],
      fontWeightStrong: 400,
      colorBorderBg: gray[600],
      colorTextPlaceholder: gray[100],
      colorBgContainerDisabled: gray[800],
      margin: 0,
      controlHeight: 44,
    },
    InputNumber: {
      // paddingBlock: 10,
      // paddingInline: 15,
      // borderRadius: 8,
      fontSize: 16,
      colorText: gray[100],
      colorBgContainer: gray[800],
      fontWeightStrong: 400,
      colorBorderBg: gray[600],
      colorTextPlaceholder: gray[100],
      colorBgContainerDisabled: gray[800],
      margin: 0,
      controlHeight: 44,
      // controlWidth: 500,
    },
    Radio: {
      buttonBg: primary[100],
      buttonColor: gray[300],
      fontWeightStrong: 600,
    },

    Select: {
      controlHeight: 44,
      colorBgContainer: gray[800],
      controlPaddingHorizontal: 15,
      borderRadius: 8,
      fontSize: 16,
      colorText: gray[100],
      fontWeightStrong: 400,
      colorBorderBg: gray[600],
    },
    Pagination: {
      itemActiveBg: primary[100],
      colorText: gray[100],
      colorPrimary: white[200],
    },
    Table: {
      headerBg: primary[500],
      rowHoverBg: primary[300],
      fontSize: 16,
      borderRadius: 0,
      headerBorderRadius: 0,
      borderRadiusOuter: 0,
      colorText: gray[300],
      headerColor: gray[200],
      cellFontSize: 16,
      // fontWeightStrong: 400,
      cellPaddingInline: 10,
      cellPaddingBlock: 5,
      headerSortActiveBg: primary[500],
      headerSortHoverBg: primary[300],
      fixedHeaderSortActiveBg: primary[500],
    },
    DatePicker: {
      cellActiveWithRangeBg: gray[500],
      cellRangeBorderColor: primary[200],
    },
    Typography: {
      titleMarginTop: 0,
      titleMarginBottom: 0,
      margin: 0,
      fontWeightStrong: 700,
      lineHeight: 1,
      colorTextSecondary: "red",
    },
    Layout: {
      headerBg: gray[400],
      headerPadding: "4px 20px",
      headerHeight: 60,
      bodyBg: gray[400],
      siderBg: primary[100],
    },
    Alert: {
      colorSuccessBg: "#fff",
      borderRadius: 8,
      colorSuccessText: primary[100],
      colorSuccessTextActive: primary[100],
      colorSuccess: primary[100],
      colorSuccessActive: primary[100],
      colorSuccessBorder: primary[100],
    },
    Menu: {
      subMenuItemBg: primary[100],
      itemActiveBg: primary[200],
      itemBg: primary[100],
      itemMarginBlock: 0,
      itemMarginInline: 0,
      itemPaddingInline: "0",
      colorText: white[100],
      itemColor: white[100],
      itemHoverBg: primary[200],
      itemHoverColor: white[100],
      itemSelectedBg: primary[200],
      itemSelectedColor: white[100],
      itemHeight: 56,
      groupTitleFontSize: 16,
    },
    Dropdown: {
      colorText: gray[300],
      controlPaddingHorizontal: 15,
      controlHeight: 42,
      lineHeight: 1,
      paddingContentHorizontal: 30,
      fontSize: 16,
      borderRadiusLG: 8,
      fontWeightStrong: 600,
      controlItemBgHover: gray[500],
      controlItemBgActive: gray[500],
    },
  },
};

const StyledComponentsRegistry = ({ children }: React.PropsWithChildren) => {
  const cache = React.useMemo<Entity>(() => createCache(), []);

  return (
    <StyleProvider cache={cache} hashPriority="low">
      <style
        id="antd"
        dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
      />
      <ConfigProvider theme={appTheme}>{children}</ConfigProvider>
    </StyleProvider>
  );
};

export default StyledComponentsRegistry;
