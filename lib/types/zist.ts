export type ZistConfig = {
  category?: string;
  tags?: string[];
};

export type Filters = {
  category?: string;
  tags?: string[];
  search?: string;
  language?: string;
  private?: boolean;
};

export type TabsView = {
  [key: string]: {
    key: string;
    value: string;
  };
};

export type Tab = {
  key: string;
  value: string;
};

export type Sorts = 'updated' | 'created';

export type SortOrder = 'asc' | 'desc';
