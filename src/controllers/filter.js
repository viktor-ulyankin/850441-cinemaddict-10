import FilterComponent from '../components/filter.js';
import {RenderPosition, FilterType} from "../utils/const.js";
import {replace} from "../utils/common.js";
import {getCardsByFilter} from "../utils/filter.js";

export default class FilterController {
  constructor(container, movieModel) {
    this._container = container;
    this._movieModel = movieModel;
    this._filterComponent = null;
    this._activeFilterType = FilterType.ALL;
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._movieModel.setDataChangeHandler = this._onDataChange;
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
    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      this._filterComponent.render(this._container, RenderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    this._movieModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
