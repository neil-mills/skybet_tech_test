import React, { Component } from 'react'
import styled from "styled-components";
import PropTypes from 'prop-types';
import '../images/chevron-down.svg';
import { ReactComponent as Chevron } from '../images/chevron-down.svg';
let Wrapper = styled.section`
    display: block;
    border: 1px solid ${props => props.theme.sbMdBlue};
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 2px;
`;
let Handle = styled.section`
    background: ${props => props.theme.sbBlue};
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
`;
const Title = styled.span`
    color: ${props => props.theme.white};
`;

export default class Accordion extends Component {
    state = {
        isOpen: false
    };
    static propTypes = {
        isOpen: PropTypes.bool
    };
    static defaultProps = {
        isOpen: false
    };
    componentDidMount() {
        const { isOpen } = this.props;
        this.setState({ isOpen });
    };
    handleClick = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }
    render() {
        const { title, children } = this.props;
        const { isOpen } = this.state;
        const Content = styled.div`
            display: ${isOpen ? 'block' : 'none'};
        `;
        const rotate = isOpen ? `180deg` : `0deg`;
        const Arrow = styled.div`
            transform: rotate(${rotate});
            width: 15px;
            height: 9px;
            fill: white;
        `;
        return (
            <Wrapper className={`accordion${isOpen ? ` accordion--open` : ``}`}>
                <Handle className="accordion-handle" onClick={this.handleClick}>
                    <Title className="accordion-handle__text">{title}</Title>
                    <Arrow>
                    <Chevron style={{position: 'absolute', top: 0, left: 0}} />
                    </Arrow>
                  
                </Handle>
                <Content className="accordion__content">
                    {isOpen &&
                    children
                    }
                </Content>
            </Wrapper>
        );
    }
};
