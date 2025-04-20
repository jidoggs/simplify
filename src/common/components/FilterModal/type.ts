export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
  filterParams: {
    dateRange: string[];
    searchText: string;
    status: string;
  };
  setFilterParams: (
    key: "dateRange" | "searchText" | "status",
    value: string | string[]
  ) => void;
}
