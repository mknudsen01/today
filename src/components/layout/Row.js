import React, { PropTypes } from 'react';
import classnames from 'classnames';


function Row(props) {
  const classes = classnames({
    'row': true,

    'gutter--0': props.noGutter,

    'gutter+': props.gutter === '+',
    'gutter++': props.gutter === '++',
    'gutter-': props.gutter === '-',
    'gutter--': props.gutter === '--',

    'flex-direction--row-reverse': props.reverse,

    'justify-content--start': props.start,
    'justify-content--center': props.center,
    'justify-content--end': props.end,
    'justify-content--around': props.around,
    'justify-content--between': props.between,

    'align-items--start': props.top,
    'align-items--center': props.middle,
    'align-items--end': props.bottom,
    'align-items--baseline': props.baseline,
  });

  return (
    <div className={classes} style={props.style} data-layout="row">
      {props.children}
    </div>
  );
}

Row.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,

  noGutter: PropTypes.bool,
  gutter: PropTypes.oneOf(['+', '++', '-', '--']),
  reverse: PropTypes.bool,

  // horizontal alignment/spacing of non-100% row
  start: PropTypes.bool,
  center: PropTypes.bool,
  end: PropTypes.bool,
  around: PropTypes.bool,
  between: PropTypes.bool,

  // alignment of the column items
  top: PropTypes.bool,
  middle: PropTypes.bool,
  bottom: PropTypes.bool,
  baseline: PropTypes.bool,
};

export default Row;

