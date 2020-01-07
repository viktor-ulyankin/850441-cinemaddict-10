import {RenderPosition, FilterType} from "../utils/const.js";
import {replace} from "../utils/common.js";
import {getCardsByFilter} from "../utils/filter.js";
import FilterComponent from '../components/filter.js';

export default class FilterController {
  constructor(container, movieModel) {
    this._container = container;
    this._movieModel = movieModel;
    this._filterComponent = null;
    this._activeFilterType = FilterType.ALL;
    this._onChange = this._onChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._movieModel.onDataChange(this._onDataChange);
    this._onItemClickHandler = null;
  }

  render() {
    const allCards = this._movieModel.getAllItems();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getCardsByFilter(allCards, filterType).length,
        isActive: filterType === this._activeFilterType,
      };
    });
    const oldFilterComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.onChange(this._onChange);

    if (oldFilterComponent) {
      replace(this._filterComponent, oldFilterComponent);
    } else {
      this._filterComponent.render(this._container, RenderPosition.BEFOREEND);
    }
  }

  _onChange(filterType) {
    if (filterType !== `stats`) {
      this._movieModel.setFilter(filterType);
      this._activeFilterType = filterType;
    }

    if (this._onItemClickHandler) {
      this._onItemClickHandler(filterType);
    }
  }

  _onDataChange() {
    this.render();
  }

  onItemClick(handler) {
    handler();
    this._onItemClickHandler = handler;
  }
}
