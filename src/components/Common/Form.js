import styled from 'styled-components';

export const AlignedForm = styled.div`
  display: flex;
  line-height: 1.2rem;
  margin-top: 1em;
  & > div {
    display: flex;
    flex-direction: column;
  }
  & > div:first-child {
    flex: 1;
  }
  & > div:first-child > * {
    padding-left: 0;
  }
  & > div:last-child > * {
    padding-right: 0;
  }
  & > div:not(:first-child) {
    text-align: right;
  }
`;

export const Label = styled.label`
  padding: 0.25em;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.82);
`;

export const LabelDotLeft = styled.div`
  padding: 0.25em;
  box-sizing: border-box;
  margin-left: 1.2em;
  position: relative;
  color: rgba(255, 255, 255, 0.82);
  &:after {
    content: '•';
    position: absolute;
    left: -0.65em;
    top: 0.35em;
    font-size: 2em;
    line-height: 0;
    opacity: ${prop => (prop.opacity ? prop.opacity : 1)};
    color: ${prop => prop.color};
  }
`;
