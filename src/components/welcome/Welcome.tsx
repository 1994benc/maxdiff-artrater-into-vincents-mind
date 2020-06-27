import React from 'react'
import { buttonClasses } from '../../assets/classes'
import { Link } from 'react-router-dom'

export default function Welcome() {
    return (
        <div>
            <div className="mb-5">
                Thank you for participating in this study. The goal of this research project is to develop an online platform for exploring the psychology of Vincent van Gogh through digitised versions of his letters and comparing it with various features and insights extracted from his artworks throughout his lifetime. We hope that this online platform will be able to provide never-before-seen insights of the psychology of the great artist and inspire further studies in the field of psychology, art, and data science.
                If you would like any further information about this study, or have any questions, please contact: Ben.chomsang@warwick.ac.uk
            </div>
            <h2 className="text-xl font-semibold">Instruction</h2>
            <div className="mb-6 mt-3">
                During the trials, you will be shown 4 images of van Gogh artwork at a time. Click the image that best answer the prompt shown on the page. Please work at a rapid pace and don’t spend too much time thinking about each image. Rather, make your ratings based on your first and immediate reaction as you see each image.
            </div>
            <Link to="/prolific" className={buttonClasses}>Next</Link>
        </div>
    )
}
