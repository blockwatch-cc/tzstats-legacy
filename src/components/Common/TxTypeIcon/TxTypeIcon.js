import React from 'react';
import styled from 'styled-components';

const TxTypeIcon = ({ type, fontSize = 14, isSuccess, mr, mt, alignSelf }) => {
  let color = isSuccess ? '#26B2EE' : '#FC6483';
  switch (type) {
    case 'transaction':
      return (
        <Icon fontSize={fontSize} color={color} mr={mr} alignSelf={alignSelf}>
          <svg width={fontSize} height={fontSize} viewBox="0 0 32 32" version="1.1">
            <g stroke="none" fill="none">
              <path
                d="M7.58578644,28.5857864 C6.80473785,29.366835 6.80473785,30.633165 7.58578644,31.4142136 C8.36683502,32.1952621 9.63316498,32.1952621 10.4142136,31.4142136 L25.8284271,16 L10.4142136,0.585786438 C9.63316498,-0.195262146 8.36683502,-0.195262146 7.58578644,0.585786438 C6.80473785,1.36683502 6.80473785,2.63316498 7.58578644,3.41421356 L20.1715729,16 L7.58578644,28.5857864 Z"
                fill={color}
              ></path>
            </g>
          </svg>
        </Icon>
      );
    case 'contract':
      return (
        <Icon fontSize={fontSize} color={color} mr={mr} alignSelf={alignSelf}>
          &#9856;
        </Icon>
      );
    case 'endorsement':
      return (
        <Icon fontSize={fontSize} color={color} mr={mr} alignSelf={alignSelf}>
          <svg width={fontSize} height={fontSize} viewBox="0 0 32 32" version="1.1">
            <g transform="translate(-0.000021, 4.999936)" fill={color}>
              <path d="M3.3287491,12.1719123 C2.50318356,11.4380763 1.23903882,11.5124377 0.505202786,12.3380033 C-0.228633247,13.1635688 -0.154271792,14.4277135 0.671293745,15.1615496 L8.23388452,21.8838525 L23.5522494,3.26124953 C24.2487828,2.40397768 24.1184785,1.14436966 23.2612067,0.447836278 C22.4039348,-0.248697102 21.1443268,-0.118392824 20.4477934,0.738879028 L7.76615833,16.1162761 L3.3287491,12.1719123 Z"></path>
            </g>
          </svg>
        </Icon>
      );
    case 'delegation':
      return (
        <Icon fontSize={fontSize} color={color} mr={mr} alignSelf={alignSelf}>
          <svg width={fontSize} height={fontSize} viewBox="0 0 32 32" version="1.1">
            <g stroke="none" fill="none">
              <path
                d="M12.1353635,28.5378895 L25.5688165,15.9999926 L12.1353635,3.46211054 C11.3278621,2.70844261 11.2842215,1.44286485 12.0378895,0.635363499 C12.7915574,-0.172137853 14.0571351,-0.215778465 14.8646365,0.537889464 L31.4311835,15.9999926 L14.8646365,31.4621105 C14.0571351,32.2157785 12.7915574,32.1721379 12.0378895,31.3646365 C11.2842215,30.5571351 11.3278621,29.2915574 12.1353635,28.5378895 Z M2,8 C2,6.8954305 2.8954305,6 4,6 C5.1045695,6 6,6.8954305 6,8 L6,24 C6,25.1045695 5.1045695,26 4,26 C2.8954305,26 2,25.1045695 2,24 L2,8 Z"
                fill={color}
              ></path>
            </g>
          </svg>
        </Icon>
      );
    case 'double_baking_evidence':
      return (
        <Icon fontSize={fontSize} fontDiff={fontSize} color={color} mr={mr} mt={mt} alignSelf={alignSelf}>
          &#8782;
        </Icon>
      );
    case 'double_endorsement_evidence':
      return (
        <Icon fontSize={fontSize} color={color} mr={mr} alignSelf={alignSelf}>
          <svg width={fontSize * 1.2} height={fontSize} viewBox="0 0 36 32" version="1.1">
            <g transform="translate(-0.000021, 4.999936)" fill={color}>
              <path d="M3.3287491,12.1719123 C2.50318356,11.4380763 1.23903882,11.5124377 0.505202786,12.3380033 C-0.228633247,13.1635688 -0.154271792,14.4277135 0.671293745,15.1615496 L8.23388452,21.8838525 L23.5522494,3.26124953 C24.2487828,2.40397768 24.1184785,1.14436966 23.2612067,0.447836278 C22.4039348,-0.248697102 21.1443268,-0.118392824 20.4477934,0.738879028 L7.76615833,16.1162761 L3.3287491,12.1719123 Z"></path>
              <path d="M20.0000214,22.0000643 L35.5438819,3.27147878 C36.2460647,2.41882819 36.1240865,1.15838665 35.2714359,0.456203807 C34.4187853,-0.245979035 33.1583438,-0.124000821 32.456161,0.728649773 L16.9123005,19.4572353 L20.0000214,22.0000643 Z"></path>
            </g>
          </svg>
        </Icon>
      );
    case 'origination':
      return (
        <Icon fontSize={fontSize} color={color} mr={mr} alignSelf={alignSelf}>
          &#9675;
        </Icon>
      );
    case 'seed_nonce_revelation':
      return (
        <Icon fontSize={fontSize} color={color} mr={mr} alignSelf={alignSelf}>
          ≈
        </Icon>
      );
    case 'proposals':
      return (
        <Icon fontSize={fontSize} color={color} mr={mr} alignSelf={alignSelf}>
          <svg width={fontSize} height={fontSize} viewBox="0 0 32 32" version="1.1">
            <g stroke="none" fill="none">
              <path
                d="M16.8566417,3.56110251 L31.6066417,28.5914055 C31.8870324,29.0672201 31.7286101,29.6802456 31.2527955,29.9606363 C31.0989614,30.0512886 30.9236607,30.0990978 30.7451032,30.0990978 L1.24510321,30.0990978 C0.692818461,30.0990978 0.245103211,29.6513826 0.245103211,29.0990978 C0.245103211,28.9205404 0.292912508,28.7452396 0.38356475,28.5914055 L15.1335647,3.56110251 C15.4139555,3.08528796 16.026981,2.92686564 16.5027955,3.20725636 C16.6488266,3.2933104 16.7705876,3.41507141 16.8566417,3.56110251 Z M5.5,26.6677341 L26.5,26.6677341 L16,9.66773405 L5.5,26.6677341 Z"
                fill={color}
                transform="translate(15.995183, 16.583867) scale(1, -1) translate(-15.995183, -16.583867) "
              ></path>
            </g>
          </svg>
        </Icon>
      );
    case 'ballot':
      return (
        <Icon fontSize={fontSize} color={color} mr={mr} alignSelf={alignSelf}>
          <svg width={fontSize} height={fontSize} viewBox="0 0 32 32" version="1.1">
            <g stroke="none" fill="none">
              <path
                d="M17.4142136,1.58578644 L30.4142136,14.5857864 C31.1952621,15.366835 31.1952621,16.633165 30.4142136,17.4142136 L17.4142136,30.4142136 C16.633165,31.1952621 15.366835,31.1952621 14.5857864,30.4142136 L1.58578644,17.4142136 C0.804737854,16.633165 0.804737854,15.366835 1.58578644,14.5857864 L14.5857864,1.58578644 C15.366835,0.804737854 16.633165,0.804737854 17.4142136,1.58578644 Z M16,5.82842712 L5.82842712,16 L16,26.1715729 L26.1715729,16 L16,5.82842712 Z"
                fill={color}
              ></path>
            </g>
          </svg>
        </Icon>
      );
    case 'activate_account':
      return (
        <Icon fontSize={fontSize} color={color} mr={mr} alignSelf={alignSelf}>
          <svg width={fontSize} height={fontSize} viewBox="0 0 32 32" version="1.1">
            <g stroke="none" fill="none">
              <path
                d="M10,2.24813106 L10,6.18736779 C6.70097723,8.20889058 4.5,11.8474124 4.5,16 C4.5,22.3512746 9.64872538,27.5 16,27.5 C22.3512746,27.5 27.5,22.3512746 27.5,16 C27.5,11.8474124 25.2990228,8.20889058 22.000004,6.18737025 L22,2.24813106 C27.2977143,4.56280092 31,9.84904289 31,16 C31,24.2842712 24.2842712,31 16,31 C7.71572875,31 1,24.2842712 1,16 C1,9.84904289 4.70228565,4.56280092 10,2.24813106 Z M18,13.5 C18,14.6045695 17.1045695,15.5 16,15.5 C14.8954305,15.5 14,14.6045695 14,13.5 L14,2 C14,0.8954305 14.8954305,0 16,0 C17.1045695,0 18,0.8954305 18,2 L18,13.5 Z"
                fill={color}
              ></path>
            </g>
          </svg>
        </Icon>
      );
    case 'reveal':
      return (
        <Icon fontSize={fontSize} color={color} mr={mr} alignSelf={alignSelf}>
          <svg width={fontSize} height={fontSize} viewBox="0 0 32 32" version="1.1">
            <g stroke="none" fill="none">
              <path
                d="M1.38449106,17.6790381 L0.551179459,16.537241 L1.34938548,15.3706322 C6.01748261,8.54802867 10.8726797,5 16,5 C21.1273203,5 25.9825174,8.54802867 30.6506145,15.3706322 L31.4488205,16.537241 L30.6155089,17.6790381 C25.6545185,24.476549 20.832954,28 16,28 C11.167046,28 6.34548145,24.476549 1.38449106,17.6790381 Z M16,24 C19.0367579,24 22.5860318,21.5556858 26.5254592,16.4647161 C22.8268145,11.4146623 19.2954515,9 16,9 C12.7045485,9 9.17318554,11.4146623 5.47454082,16.4647161 C9.4139682,21.5556858 12.9632421,24 16,24 Z M16,19 C14.3431458,19 13,17.6568542 13,16 C13,14.3431458 14.3431458,13 16,13 C17.6568542,13 19,14.3431458 19,16 C19,17.6568542 17.6568542,19 16,19 Z"
                fill={color}
              ></path>
            </g>
          </svg>
        </Icon>
      );
    default:
      return '';
  }
};

const Icon = styled.span`
  font-size: ${prop => prop.fontSize + (prop.fontDiff || 0)}px;
  line-height: ${prop => prop.fontSize}px;
  font-weight: 300;
  color: ${prop => prop.color};
  margin-right: ${prop => prop.mr || 3}px;
  margin-top: ${prop => prop.mt || 0}px;
  display: flex;
  align-items: center;
  align-self: ${props => props.alignSelf || ''};
`;

export default TxTypeIcon;
