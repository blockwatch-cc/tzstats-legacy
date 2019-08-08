import React from 'react';
import { Label, Annotate } from 'react-stockcharts/lib/annotation';
import LabelAnnotation from './LabelAnnotation';
const VolumeAnnotation = ({ maxValue, setCurrentValue }) => {
  let data = [5, 4, 3, 2, 1, 0];
  let periods = ['00:00 - 04:00', '04:00 - 08:00', '08:00 - 12:00', '12:00 - 16:00', '16:00 - 20:00', '20:00 - 24:00'];

  return (
    <>
      {data.map((item, i) => {
        return (
          <>
            <Annotate
              with={LabelAnnotation}
              when={d => (d.hourVolumes[i][1] / maxValue) * 100 < 25}
              usingProps={{
                fontSize: 28,
                fill: '#18ecf2',
                opacity: 0.1,
                text: '\u25FC',
                y: ({ yScale }) => yScale.range()[0] - item * 20,
                onMouseEnter: d =>
                  setCurrentValue({ volume: d.datum.hourVolumes[i][1], data: d.datum, period: periods[i] }),
              }}
            />
            <Annotate
              with={LabelAnnotation}
              when={d => (d.hourVolumes[i][1] / maxValue) * 100 >= 25 && (d.hourVolumes[i][1] / maxValue) * 100 < 50}
              usingProps={{
                fontSize: 28,
                fill: '#18ecf2',
                opacity: 0.3,
                text: '\u25FC',
                y: ({ yScale }) => yScale.range()[0] - item * 20,
                tooltip: d => d.hourVolumes[i][1],
              }}
            />
            <Annotate
              with={LabelAnnotation}
              when={d => (d.hourVolumes[i][1] / maxValue) * 100 >= 50 && (d.hourVolumes[i][1] / maxValue) * 100 < 75}
              usingProps={{
                fontSize: 28,
                fill: '#18ecf2',
                opacity: 0.6,
                text: '\u25FC',
                y: ({ yScale }) => yScale.range()[0] - item * 20,
                tooltip: d => d.hourVolumes[i][1],
              }}
            />
            <Annotate
              with={LabelAnnotation}
              when={d => (d.hourVolumes[i][1] / maxValue) * 100 >= 75}
              usingProps={{
                fontSize: 28,
                className: 'react-stockcharts-labelannotation1',
                fill: '#18ecf2',
                opacity: 0.9,
                text: '\u25FC',
                y: ({ yScale }) => yScale.range()[0] - item * 20,
                tooltip: d => <div style={{ fill: 'red', width: 100 }}> {d.hourVolumes[i][1]}</div>,
              }}
            />
          </>
        );
      })}
    </>
  );
};

export default VolumeAnnotation;
