#QA Test Plan

Project: Madelyn Locke Portfolio Website
Author: Madelyn Locke
Date: March 2026
Version: 1.0
Test Environment: Production (GitHub Pages)

1. Overview

This document defines the testing strategy, scope, and execution plan for the Madelyn Locke Portfolio Website.

The goal of this test plan is to ensure the website functions correctly across supported browsers and devices, with reliable navigation, working external links, accessible content, and responsive layout behavior.

The test plan covers core user journeys such as:

- viewing the home page
- navigating to projects
- accessing the resume
- accessing contact options
- interacting with project links

2. Project Information
| Item	| Description |
| Website |	https://madelynmlocke.github.io |
| Application | Type |	Static Portfolio Website |
| Hosting | GitHub Pages |
| Technology | HTML, CSS, JavaScript |
| Target Users | Recruiters, hiring managers, potential collaborators |

3. Testing Objectives

The primary objectives of testing are to verify:

- all navigation routes function correctly
- pages load without errors
- project links open correct destinations
- layout renders correctly across screen sizes
- external links work properly
- accessibility basics are met
-  no broken pages or assets exist

4. Scope of Testing
###In Scope
| Area	| Description |
| Navigation | Header navigation and internal links |
| Pages	| Home, Projects, Resume, Contact |
| External Links | GitHub, LinkedIn, Live Demo links |
| Content | Text, headings, images |
| Layout | Responsive layout across devices |
| Accessibility | Keyboard navigation and basic accessibility checks |
| Cross Browser | Chrome, Firefox, Edge, Safari |

###Out of Scope
| Area | Reason |
| Backend API testing | Site is static | 
| Security penetration testing | Outside portfolio scope | 
| Performance benchmarking | Not critical for static site | 
| SEO optimization | Not part of QA functional testing | 

5. Test Environment
| Component | Details | 
| Environment | Production | 
| URL | https://madelynmlocke.github.io | 
| Browser | Chrome, Firefox, Edge, Safari | 
| Devices | Desktop, Tablet, Mobile | 
| Viewports | 375px, 768px, 1440px | 

6. Entry and Exit Criteria
Entry Criteria
Testing begins when:
- site deployment is complete
- pages load without server errors
- all navigation routes are visible

Exit Criteria

Testing is considered complete when:
- all high priority test cases pass
- no critical defects remain open
- navigation flows function correctly
- responsive layout is acceptable across breakpoints

7. Test Strategy

Testing will include:

| Testing Type	| Purpose | 
| Smoke Testing	| Verify basic site functionality | 
| Functional Testing | 	Validate navigation and links | 
| UI Testing | 	Confirm layout and visual elements | 
| Responsive Testing | 	Verify mobile and tablet layouts | 
| Accessibility Testing	| Basic keyboard and structural checks | 
| Regression Testing | 	Verify fixes after defects | 

8. High Level Test Scenarios
| ID | Scenario	| Priority | 
| TS-01	| Home page loads successfully	| High | 
| TS-02	| Navigation links work	| High | 
| TS-03	| Projects page loads | High | 
| TS-04	| Project GitHub links open correct repos	| Medium | 
| TS-05	| Project demo links open | High | 
| TS-06	| Resume link works	| High | 
| TS-07	| Contact page loads | High | 
| TS-08	| Footer links function	| Medium | 
| TS-09	| Layout adapts to mobile	| High | 
| TS-10	| Images load correctly	| Medium | 

9. Detailed Test Cases

| Test Case ID | Priority | Description | Steps | Expected Result | Status |
|---------------|----------|-------------|-------|-----------------|--------|
| TC-001 | High | Verify the home page loads successfully | 1. Open website URL | Page loads without error | Pass |
| TC-002 | High | Verify navigation menu links | Click each nav link | Correct page loads | Pass |
| TC-003 | High | Verify projects page loads | Click Projects in navigation | Projects page loads | Pass |
| TC-004 | Medium | Verify GitHub links open correct repository | Click GitHub link under each project | GitHub repo opens in new tab | Pass |
| TC-005 | High | Verify Live Demo links open | Click each demo link | Demo application loads | Pass |
| TC-006 | High | Verify resume link opens | Click Resume link | Resume file opens or downloads | Needs Verification |
| TC-007 | Critical | Verify contact page loads | Click Contact link | Contact page loads | Fail |
| TC-008 | High | Verify layout adapts on mobile | Resize browser to mobile width | Content stacks correctly | Pass |
| TC-009 | Medium | Verify images load correctly | Inspect project cards | Images display correctly | Pass |

10. Defect Severity Levels
| Severity | Description | 
|---------|---------------|
| Critical | Core feature broken | 
| High | Major functionality impaired | 
| Medium | Minor functionality issue | 
| Low | Cosmetic issue | 

11. Bug Report Log
BUG-001 Contact Page Returns 404
Field	Description
Bug ID	BUG-001
Severity	High
Priority	High
Status	Open
Environment	Production
Description	Contact navigation route returns 404
Steps to Reproduce	Click Contact in navigation
Expected Result	Contact page loads
Actual Result	Page not found
Possible Cause	Missing file or incorrect path
BUG-002 Resume Link Needs Verification
Field	Description
Bug ID	BUG-002
Severity	Medium
Priority	Medium
Status	Investigating
Description	Resume link should be verified across browsers
Steps to Reproduce	Click Resume link
Expected Result	Resume opens
Actual Result	Needs manual validation

12. Risk Assessment
| Risk | Impact | Mitigation | 
|---------|---------------|------------|
| Broken external links	| Recruiters unable to view work | Link validation | 
| Missing pages	Poor UX	| Navigation testing | 
| Mobile layout issues | Reduced usability	Responsive testing | 

13. Test Deliverables

- QA Test Plan Document
- Test Case Documentation
- Bug Report Log
- Test Execution Results

14. Summary

This QA test plan ensures the portfolio website is reliable, accessible, and functional for users viewing the site. Testing focuses on core user journeys including navigation, project viewing, and resume access.

The test plan provides structured validation and defect tracking that mirrors real QA workflows used in production environments.