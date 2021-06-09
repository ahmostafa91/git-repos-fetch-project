import React, { useState, useRef, useCallback } from 'react'
import InfoBox from '../../common/infoBox/InfoBox';
import useCardInfo from './../cardInfo/CardInfo';
import './detailsCardStyle.scss';

export default function DetailsCard() {
  const [pageNumber, setPageNumber] = useState(1)

  const {
    repo,
    hasMore,
    loading,
    error,
    errorMessage
  } = useCardInfo(pageNumber)
  
  const observer = useRef()
  const lastBookElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  return (
    <>
    {repo.map((rep, index) => {
        if(repo.length === index + 1) {
           return (
            <div className="info-card"  ref={lastBookElementRef} key={index}>
              <div className="avatar-wrapper">
                <img alt="repo avatar" className="user-avatar" src={rep.owner.avatar_url} />
              </div>
              <div className="info-wrapper">
                <span>
                  <h2>{rep.name} </h2>
                  <div>{rep.description} </div>    
                </span>
                <InfoBox>stars: {rep.stargazers_count}</InfoBox>
                <InfoBox>open issues: {rep.open_issues}</InfoBox>
              </div>
            </div>
           ); 
        }
        else {
            return (
            <div className="info-card" key={index}>
              <div className="avatar-wrapper">
                <img alt="repo avatar" className="user-avatar" src={rep.owner.avatar_url} />
              </div>
              <div className="info-wrapper">
                <span>
                  <h2>{rep.name} </h2>
                  <div>{rep.description} </div>    
                </span>
                <InfoBox>stars: {rep.stargazers_count}</InfoBox>
                <InfoBox>open issues: {rep.open_issues}</InfoBox>
              </div>
            </div>
            ); 
        }
    })}
    <div>{loading && !error &&
    <div className="loading">
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
    </div>
    }</div>
    <div>{error && errorMessage && errorMessage.errors[0].message}</div>
    <div>{repo.length === 0 && 'No Result Found'}</div>
    </>
  )
}