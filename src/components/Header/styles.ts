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
        opacity: 0.8;
        text-decoration: none;
        font-size: 16px;
        border-bottom: 2px solid transparent;
        padding: 0 0 5px 0;
        transition: all 0.2s;

        & + a {
          margin-left: 32px;
        }

        &:hover {
          opacity: 1;
          border-bottom: 2px solid #ff872c;
        }
      }
    }
  }
`;
