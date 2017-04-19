import React, { PropTypes } from 'react';
import classnames from 'classnames';

function Column(props) {
  const classes = classnames({
    [props.className]: props.className,
    'first': props.first,
    'last': props.last,

    'text-align--left': props.start,
    'text-align--center': props.center,
    'text-align--right': props.end,

    'align-items--start': props.top,
    'align-items--center': props.middle,
    'align-items--end': props.bottom,
    'align-items--baseline': props.baseline,

    'col': !props.span,
    'col--1': props.span === 1,
    'col--2': props.span === 2,
    'col--3': props.span === 3,
    'col--4': props.span === 4,
    'col--5': props.span === 5,
    'col--6': props.span === 6,
    'col--7': props.span === 7,
    'col--8': props.span === 8,
    'col--9': props.span === 9,
    'col--10': props.span === 10,
    'col--11': props.span === 11,
    'col--12': props.span === 12,

    'col--offset-0': props.offset === 0,
    'col--offset-1': props.offset === 1,
    'col--offset-2': props.offset === 2,
    'col--offset-3': props.offset === 3,
    'col--offset-4': props.offset === 4,
    'col--offset-5': props.offset === 5,
    'col--offset-6': props.offset === 6,
    'col--offset-7': props.offset === 7,
    'col--offset-8': props.offset === 8,
    'col--offset-9': props.offset === 9,
    'col--offset-10': props.offset === 10,
    'col--offset-11': props.offset === 11,
    'col--offset-12': props.offset === 12,

    'hide': props.hide,
    'hide--xs-only': props.hideXs,
    'hide--sm-only': props.hideSm,

    'col--sm-1': props.spanSm === 1,
    'col--sm-2': props.spanSm === 2,
    'col--sm-3': props.spanSm === 3,
    'col--sm-4': props.spanSm === 4,
    'col--sm-5': props.spanSm === 5,
    'col--sm-6': props.spanSm === 6,
    'col--sm-7': props.spanSm === 7,
    'col--sm-8': props.spanSm === 8,
    'col--sm-9': props.spanSm === 9,
    'col--sm-10': props.spanSm === 10,
    'col--sm-11': props.spanSm === 11,
    'col--sm-12': props.spanSm === 12,

    'col--sm-offset-1': props.offsetSm === 1,
    'col--sm-offset-2': props.offsetSm === 2,
    'col--sm-offset-3': props.offsetSm === 3,
    'col--sm-offset-4': props.offsetSm === 4,
    'col--sm-offset-5': props.offsetSm === 5,
    'col--sm-offset-6': props.offsetSm === 6,
    'col--sm-offset-7': props.offsetSm === 7,
    'col--sm-offset-8': props.offsetSm === 8,
    'col--sm-offset-9': props.offsetSm === 9,
    'col--sm-offset-10': props.offsetSm === 10,
    'col--sm-offset-11': props.offsetSm === 11,
    'col--sm-offset-12': props.offsetSm === 12,
  });

  return (
    <div className={classes} style={props.style} onClick={props.onClick ? props.onClick : null}>
      {props.children}
    </div>
  );
}

Column.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  first: PropTypes.bool,
  last: PropTypes.bool,
  start: PropTypes.bool,
  center: PropTypes.bool,
  end: PropTypes.bool,
  top: PropTypes.bool,
  middle: PropTypes.bool,
  bottom: PropTypes.bool,
  baseline: PropTypes.bool,
  span: PropTypes.number,
  offset: PropTypes.number,
  hideXs: PropTypes.bool,
  hide: PropTypes.bool,
  hideSm: PropTypes.bool,
  spanSm: PropTypes.number,
  offsetSm: PropTypes.number,
  onClick: PropTypes.func,
};

export default Column;
