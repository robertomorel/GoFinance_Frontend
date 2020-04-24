import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  padding: 30px 0;

  header {
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      a {
        color: #fff;
        text-decoration: ${({ size }) =>
          size === 'small' ? 'none' : 'underline #ff872c'};
        font-size: 16px;
        transition: opacity 0.2s;

        & + a {
          margin-left: 32px;
          text-decoration: ${({ size }) =>
            size === 'small' ? 'underline #ff872c' : 'none'};
        }

        &:hover {
          opacity: 0.6;
        }
      }
    }
  }
`;
