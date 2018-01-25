import React from 'react'
import { connect } from 'react-redux'
import {
    compose,
    withState,
    lifecycle,
} from 'recompose'

import API from '../../API.js'

import { push } from 'react-router-redux'

import getStyles, {
} from './BlogPostListStyles.jsx'

import SidePanelDrawer from '../UI/SidePanelDrawer.jsx'
import BlogPost from './Blog.jsx'

const mapStateToProps = state => ({
    routing: state.routing,
})

const mapDispatchToProps = dispatch => ({
    goTo: url => dispatch(push(url)),
})


const BlogPostList = props => {
    const styles = getStyles(props)

    const List = () => props.blogPosts.map((e, i) => {
        let { content } = e
        if(content.length > 100) {
            content = content.substring(0, 100)
        }

        const active = parseInt(new URL(window.location.href)
            .searchParams.get('post')) === e.id

        const wrapperStyle = {
            ...styles.linkWrapper,
            ...(active ? styles.activeLink : {})
        }
        const onClickCallback = () => props.goTo(`/blog?post=${e.id}`)

        return (
            <div
                style={ wrapperStyle }
                onClick={ onClickCallback }
                className="blog-link--wrapper"
                key={ i }>
                <div style={ styles.title }>
                    { e.title }
                </div>
                <div style={ styles.content }>
                    { content }
                </div>
            </div>
        )
    })

    return (
        <div
            style={ styles.wrapper }
            className="BlogPostList--wrapper">
            <SidePanelDrawer
                Comp1={ List }
                Comp2={ () => [
                    <span
                        key={ 1 }
                        onClick={ () => props.goTo('/blog') }> Test </span>,
                    <BlogPost
                        key={ 2 }
                        showHeader={ false } /> ,
                ]}
                position={ props.drawerPosition }
            />
        </div>
    )
}

BlogPostList.defaultProps = {
}

const initialState = {
    blogPosts: [],
}

const fetchBlogPosts = async (setBlogPosts, that) => {
    const restApi = new API()
    const blogPosts = await restApi.fetchBlogPostList()

    if(that.mounted)
        setBlogPosts(blogPosts)
}

const updateDrawerFromUrl = (setDrawerPosition, urlGetParam) => {
    if(urlGetParam === '') {
        setDrawerPosition(0)
    } else {
        setDrawerPosition(1)
    }
}

const SmartComp = compose(
    withState(
        'blogPosts',
        'setBlogPosts',
        [],
    ),
    withState(
        'drawerPosition',
        'setDrawerPosition',
        0,
    ),
    lifecycle({
        componentDidMount() {
            this.mounted = true
            fetchBlogPosts(this.props.setBlogPosts, this)
            updateDrawerFromUrl(
                this.props.setDrawerPosition,
                this.props.routing.location.search)
        },
        componentWillUpdate(nextProps) {
            if(this.props.drawerPosition !== nextProps.drawerPosition) {
                updateDrawerFromUrl(
                    this.props.setDrawerPosition,
                    this.props.routing.location.search)
            }
        },
        componentWillUnmount() {
            this.mounted = false
        }
    })
)(BlogPostList)

const ConnectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartComp)

export default ConnectedComp
