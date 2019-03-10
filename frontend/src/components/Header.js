import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import LogoSrc from '../images/sbg-logo.png';
import { updatePriceFormat } from '../actions/prefs';
let HeaderWrapper = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 110px;
    padding: 15px;
    background-color:  ${props => props.theme.sbBlue};
`;
const HomeLink = styled.a`
    width: 120px;
    height: auto;
    display: block;
`;
const Logo = styled.img`
    width: 100%;
    display: block;
    `;
const Button = styled.button`
    display: block;
    border: none;
    background-color: ${props => props.theme.sbYellow};
    color: ${props => props.theme.sbBlue};
    padding: 8px;
    border-radius: 4px;
    font-weight: bold;
    line-height: 1;
`;
class Header extends Component {
    handlePriceFormatChange = (e) => {
        let { isDecimal } = this.props;
        e.preventDefault();
        this.props.updatePriceFormat(!isDecimal);
    }
    handleHomeClick = (e) => {
        e.preventDefault();
        this.props.history.push('/');
    }
    render() {
        const { isDecimal } = this.props;
        return (
            <HeaderWrapper>
                <HomeLink onClick={this.handleHomeClick}>
                    <Logo src={LogoSrc} />
                </HomeLink>
                <Button
                    onClick={this.handlePriceFormatChange}
                >
                    {`View ${ isDecimal? 'Fractional Prices' : 'Decimal Prices'}`}
                </Button>
            </HeaderWrapper>
        )
    }
}
const mapStateToProps = ({ isDecimal }) => {
    return {
        isDecimal
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        updatePriceFormat: (format) => dispatch(updatePriceFormat(format))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)