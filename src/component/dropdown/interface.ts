import { RefObject } from "react";

export interface DropdownProps {
  // eslint-disable-next-line no-unused-vars
  onValueSelected: (values?: Array<DropDownItem> | DropDownItem) => void;
  isMultiSelect: boolean;
  listItems: Array<DropDownItem>;
  selectedItem?: DropDownItem;
  selectedItems?: Array<DropDownItem>;
  fieldTitle?: string;
  showSearch: boolean;
  showDialogTitle: boolean;
  showDialogButton: boolean;
  dialogListMaxHeight?: number;
  isModal?: boolean;
  disabled?: boolean;
  destinationRef?: RefObject<HTMLDivElement>;
}

export interface DropDownItem {
  id: number;
  name: string;
  short?: string;
}

export interface State {
  selectedValue: DropDownItem | Array<DropDownItem> | any;
}
