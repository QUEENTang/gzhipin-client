import React, {Component} from "react"
import PropTypes from "prop-types"
import {TabBar} from "antd-mobile"
import {withRouter} from "react-router-dom"

const Item = TabBar.Item;

class NavFooter extends Component {
    static propTypes = {
        navList: PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired
    };

    render () {
        const navList = this.props.navList.filter(nav => !nav.hide);

        const {pathname} = this.props.location;
        const {unReadCount} = this.props;

        return(
            <TabBar>
                {
                    navList.map((nav, index) => (
                        <Item key={nav.path} title={nav.text}
                              badge={nav.path === "/message" ? unReadCount : 0}
                              icon={{uri: require(`./imgs/${nav.icon}.png`)}}
                              selectedIcon={{uri: require(`./imgs/${nav.icon}-selected.png`)}}
                              selected={pathname === nav.path}
                              onPress={() => {
                                  this.props.history.replace(nav.path)
                              }}
                        />
                    ))
                }
            </TabBar>
        )
    }
}

export default withRouter(NavFooter)