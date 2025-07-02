import React from 'react'
import { useParams } from 'react-router-dom'

const ArticlePage: React.FC = () => {
  const { id } = useParams()

  // In future, you’ll fetch or filter based on this id.
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Article Title for ID: {id}</h1>
      <img
        src="https://via.placeholder.com/800x400"
        alt="Article"
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      <p className="text-gray-700 mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut
        lacus sit amet nunc blandit fermentum. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia curae...
      </p>
    </div>
  )
}

export default ArticlePage
