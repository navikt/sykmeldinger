import React, { ReactElement } from 'react'

function Breadcrumbr({ more }: any): ReactElement {
    return (
        <div>
            <nav aria-label="Du er her">
                <ol className="_list_a0d78_1">
                    <li className="_listItem_a0d78_37">
                        <a href="/" className="_link_a0d78_11 _navds-link_hglv8_3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                focusable="false"
                                aria-hidden="true"
                                role="img"
                                className="_svg_a0d78_17"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M11.47 2.47a.75.75 0 0 1 1.06 0l7 7c.141.14.22.331.22.53v11a.75.75 0 0 1-.75.75h-5a.75.75 0 0 1-.75-.75v-4.25h-2.5V21a.75.75 0 0 1-.75.75H5a.75.75 0 0 1-.75-.75V10a.75.75 0 0 1 .22-.53l7-7Zm-5.72 7.84v9.94h3.5V16a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 .75.75v4.25h3.5v-9.94L12 4.06l-6.25 6.25Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                            <span className="_span_a0d78_33">nav.no</span>
                        </a>
                        <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            focusable="false"
                            aria-hidden="true"
                            role="img"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="m17.414 12-7.707 7.707-1.414-1.414L14.586 12 8.293 5.707l1.414-1.414L17.414 12Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </li>
                    {more ? (
                        <>
                            <li className="_listItem_a0d78_37">
                                <a href="https://nav.no" className="_navds-link_hglv8_3">
                                    Test test test
                                </a>
                                <svg
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    focusable="false"
                                    aria-hidden="true"
                                    role="img"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="m17.414 12-7.707 7.707-1.414-1.414L14.586 12 8.293 5.707l1.414-1.414L17.414 12Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </li>
                            <li className="_listItem_a0d78_37">Test test test</li>
                        </>
                    ) : (
                        <>
                            <li className="_listItem_a0d78_37">
                                <a href="https://nav.no" className="_navds-link_hglv8_3">
                                    Test test test
                                </a>
                                <svg
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    focusable="false"
                                    aria-hidden="true"
                                    role="img"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="m17.414 12-7.707 7.707-1.414-1.414L14.586 12 8.293 5.707l1.414-1.414L17.414 12Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </li>
                            <li className="_listItem_a0d78_37">
                                <a href="https://nav.no" className="_navds-link_hglv8_3">
                                    Test test test
                                </a>
                                <svg
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    focusable="false"
                                    aria-hidden="true"
                                    role="img"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="m17.414 12-7.707 7.707-1.414-1.414L14.586 12 8.293 5.707l1.414-1.414L17.414 12Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </li>
                            <li className="_listItem_a0d78_37">Kvittering</li>
                        </>
                    )}
                </ol>
            </nav>
        </div>
    )
}

export default Breadcrumbr
