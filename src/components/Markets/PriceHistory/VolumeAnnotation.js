import React from 'react';
import LabelAnnotation from './LabelAnnotation';
import Annotate from './Annotate';
import {formatCurrencyShort} from '../../../utils';
const VolumeAnnotation = ({ maxValue, setCurrentValue }) => {
  let data = [5, 4, 3, 2, 1, 0];
  let periods = ['00:00 - 04:00', '04:00 - 08:00', '08:00 - 12:00', '12:00 - 16:00', '16:00 - 20:00', '20:00 - 24:00'];
  const cutoff = [0.0001, 25, 50, 75, 95, 101];
  const opacities = [0, 0.05, 0.3, 0.6, 0.9, 1];

  return (
    <>
      {data.map((item, i) => {
        return (
          <Annotate
            key={i}
            with={LabelAnnotation}
            when={d => true}
            usingProps={{
              fontSize: 25,
              fill: d => {
                let ratio = d.hourVolumes[i] ? d.hourVolumes[i][1] / maxValue * 100 : 0;
                return 'rgba(24,236,242,'+ opacities[cutoff.findIndex(n=>n>ratio)] +')';
              },
              text: '\u25FC',
              y: ({ yScale }) => yScale.range()[0] - item * 20,
              tooltip: d => d.hourVolumes[i] ? formatCurrencyShort(d.hourVolumes[i][1]) : '',
              onMouseEnter: d =>
                d.datum.hourVolumes[i] &&
                setCurrentValue({ volume: d.datum.hourVolumes[i][1], data: d.datum, period: periods[i] }),
            }}
          />
        );
      })}
    </>
  );
};

export default VolumeAnnotation;
