import styled from 'styled-components';

export const Container = styled.div`
  > div {
    width: 8px;
    height: 8px;
    background-color: #fff;

    border-radius: 100%;
    display: inline-block;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;

    & + div {
      margin-left: 4px;
    }
  }

  .bounce1 {
    animation-delay: -0.32s;
    -webkit-animation-delay: -0.32s;
  }

  .bounce2 {
    animation-delay: -0.16s;
    -webkit-animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }
    40% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }
`;
