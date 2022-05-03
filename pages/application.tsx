import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import style from '../styles/Home.module.css'
import Navbar from '../components/external/Navbar'
import Footer from '../components/external/Footer'

const Application: NextPage = () => {
  return (
    <div>
      <Navbar />
      <header className={style.main_funding_container}>
        <h1>Apply for Funding</h1>
        <p>
          Kayce is primarily interested in commercializable academic projects.
          When filling out this application please ensure to clearly articulate
          the commercialization plan. Applications that do not have a path to
          sell whatever you are making will be deprioritized. Typical funding
          parameters include one year of support for up to $250,000 direct costs
          and 10% indirect costs in exchange for an exclusive license to the
          resulting IP that gets generated. Please ensure with your organization
          that it can comply with these terms in advance of submitting your
          application
        </p>
        <Link href="/">
          <a className={style.linkd}>
            <span>Apply</span>
            <hr className={style.sec_hrd} />
          </a>
        </Link>
      </header>
      <div className={style.Founding_img}>
        <Image src="/Group054.png" height="91.69px" width="1450px" />
      </div>
      <section className={style.main_bg_funding_container}>
        <p>FUNDING CRITERIA</p>
        <div className={style.main_sm_funding_container}>
          <div className={style.bg_funding_container}>
            <h1>Research</h1>
            <ul>
              <li>Is IT disruptive ? -</li>
              <li>
                clear path to makinG units cost - less than $200 in 5 years?
              </li>
              <li>use OF easily sourced local - materials</li>
              <li>Applicabailility to multiple - markets / product lines ?</li>
            </ul>
          </div>
          <div className={style.bg_1_funding_container}>
            <h1>Financing</h1>
            <ul>
              <li>Is IT disruptive ? -</li>
              <li>
                clear path to makinG units cost - less than $200 in 5 years?
              </li>
              <li>use OF easily sourced local - materials</li>
              <li>Applicabailility to multiple - markets / product lines ?</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={style.big_main_news_section}>
        <h1 className={style.big_news_section_h1}>OUR FOCUS AREAS</h1>
        <div className={style.parent_div}>
          <div className={style.parent_div_main}>
            <div className={style.sm_news_section}>
              <div className={style.new_section2}>
                <h1>1</h1>
                <h1>Application</h1>
                <p>
                  Apply for funding from KayceDAO with a research or energy
                  start-up that is focused on developing green and sustainable
                  energy for emerging countries and economies. Read our FAQs and
                  criteria to find out if your company, project or research
                  qualify.
                </p>
              </div>
              <div className={style.news_section2}>
                <h1>2</h1>
                <h1>Evaluation</h1>
                <p>
                  Our validators will determine the market-fit, reach, impact
                  and sustainablity of your project rating each clause
                  numerically with attached supporting documents. Qualification
                  or disqualification is determined by the cut-off threshold and
                  qualified projects move to the next stage.
                </p>
              </div>
              <div className={style.news_section2}>
                <h1>3</h1>
                <h1>Voting & Funding</h1>
                <p>
                  Qualified projects are moved to a funding proposal and
                  presented to the larger body of the DAO. KayceDAO members take
                  the evaluation of the validators and other supporting
                  documents into consideration and vote for, or against funding
                  the project. *Projects that do not pass this stage may be
                  presented again after a communicated timeline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={style.big_main_news_section}>
        <div className={style.parent_div}>
          <div className={style.sm_news_section}>
            <div className={style.news_section2}>
              <h1>4</h1>
              <h1>Validation</h1>
              <p>
                Projects that are voted for are funded by the DAO using the
                KAYCE$ token system. Projects will follow a set timeline with
                fixed stages for review. At each review stage, continuation of
                the project returns to the voting and funding stage and the
                floor is open for trading of the projects token.
              </p>
            </div>
            <div className={style.news_section2}>
              <h1>5</h1>
              <h1>Completion</h1>
              <p>
                After final implementation, revenue will be disbursed to token
                investors who wish to sell. Only projects that successfully go
                through their entire timeline would reach completion stage
                making them verifiable assets under the $KAYCE blockchain.
              </p>
            </div>
            <div className={style.news_section2}>
              <h1></h1>
              <h1></h1>
              <p></p>
            </div>
          </div>
        </div>
      </section>
      <section className={style.faq_main}>
        <h1>FAQs</h1>
        <div className={style.faq_main_container}>
          <div className={style.faq_main_container_bg}>
            <div className={style.faq_main_container_div}>
              <p>Who can apply? </p>
            </div>
            <div className={style.faq_main_container_div_arrow}>
              <Image src="/path.png" height="11.02px" width="17.28px" />
            </div>
          </div>
          <hr />
          <div className={style.faq_main_container_bg}>
            <div className={style.faq_main_container_div}>
              <p>What kind of projects/companies do you finance?</p>
            </div>
            <div className={style.faq_main_container_div_arrow}>
              <Image src="/path.png" height="11.02px" width="17.28px" />
            </div>
          </div>
          <hr />
          <div className={style.faq_main_container_bg}>
            <div className={style.faq_main_container_div}>
              <p>Who owns IP from funded projects?</p>
            </div>
            <div className={style.faq_main_container_div_arrow}>
              <Image src="/path.png" height="11.02px" width="17.28px" />
            </div>
          </div>
          <hr />
          <div className={style.faq_main_container_bg}>
            <div className={style.faq_main_container_div}>
              <p>What project stages do you finance ?</p>
            </div>
            <div className={style.faq_main_container_div_arrow}>
              <Image src="/path.png" height="11.02px" width="17.28px" />
            </div>
          </div>
          <hr />
        </div>
      </section>
      <section className={style.main_application_form}>
        <h1>Application Form</h1>
        <form>
          <div className={style.bg_main_application_form}>
            <div className={style.main_bg_application_form}>
              <span className={style.sm_main_application_form_edit}>
                <div className={style.sm_main_application_form}>
                  <div className={style.application_form}>
                    <h3>Company / Project Name *</h3>
                    <label className={style.application_form_input}>
                      <input type="text" />
                    </label>
                    <hr />
                  </div>
                  <div className={style.application_form}>
                    <h3>Project Lead *</h3>
                    <label className={style.application_form_input}>
                      <input type="text" />
                    </label>
                    <hr />
                  </div>
                </div>
              </span>
              <div className={style.sm_main_application_form}>
                <div className={style.application_form}>
                  <h3>Email*</h3>
                  <label className={style.application_form_input}>
                    <input type="text" />
                  </label>
                  <hr />
                </div>
                <div className={style.application_form}>
                  <h3>Website *</h3>
                  <label className={style.application_form_input}>
                    <input type="text" />
                  </label>
                  <hr />
                </div>
              </div>
              <div className={style.application_1_form}>
                <h3>
                  Please list all key personnel, how you know each other, and
                  emails for each.*
                </h3>
                <label className={style.application_1_form_input}>
                  <input type="text" />
                </label>
                <hr />
              </div>
              <div className={style.application_1_form}>
                <h3>
                  Describe what your project objectives in 50 characters or
                  less.*
                </h3>
                <label className={style.application_1_form_input}>
                  <input type="text" />
                </label>
                <hr />
              </div>
              <div className={style.application_2_form}>
                <h3>
                  Please provide a fuller description of what you are doing and
                  how it will impact longevity/healthspan/lifespan.
                </h3>
                <label className={style.application_2_form_input}>
                  <input type="text" />
                </label>
                <hr />
              </div>
              <div className={style.application_2_form}>
                <h3>
                  How far along are you? How close to having intellectual
                  property are you? For projects that you don’t think require
                  IP, please explain.
                </h3>
                <label className={style.application_2_form_input}>
                  <input type="text" />
                </label>
                <hr />
              </div>
              <div className={style.application_2_form}>
                <h3>
                  How far along are you? How close to having intellectual
                  property are you? For projects that you don’t think require
                  IP, please explain.
                </h3>
                <label className={style.application_2_form_input}>
                  <input type="text" />
                </label>
                <hr />
              </div>
              <div className={style.application_2_form}>
                <h3>
                  What are your competitive advantages over other research and
                  people in your space?
                </h3>
                <label className={style.application_2_form_input}>
                  <input type="text" />
                </label>
                <hr />
              </div>
              <div className={style.application_2_form}>
                <h3>
                  Why did you pick this area to work on? Briefly discuss your
                  domain expertise. How do you know people need specifically
                  what you're making?
                </h3>
                <label className={style.application_2_form_input}>
                  <input type="text" />
                </label>
                <hr />
              </div>
              <div className={style.application_2_form}>
                <h3>
                  What are your competitive advantages over other research and
                  people in your space?
                </h3>
                <label className={style.application_2_form_input}>
                  <input type="text" />
                </label>
                <hr />
              </div>
              <div className={style.application_2_form}>
                <h3>
                  What is it about your approach or your findings that you think
                  others don’t understand? What’s new about it and/or surprises
                  people the most when they hear about it?
                </h3>
                <label className={style.application_2_form_input}>
                  <input type="text" />
                </label>
                <hr />
              </div>
              <div className={style.application_2_form}>
                <h3>
                  What is it about your approach or your findings that you think
                  others don’t understand? What’s new about it and/or surprises
                  people the most when they hear about it?
                </h3>
                <label className={style.application_2_form_input}>
                  <input type="text" />
                </label>
                <hr />
              </div>
              <div className={style.application_2_form}>
                <h3>
                  Briefly explain how you will spend the money we would give
                  you. This can be as simple as an itemized list of your costs.
                </h3>
                <label className={style.application_2_form_input}>
                  <input type="text" />
                </label>
                <hr />
              </div>
              <div className={style.application_2_form}>
                <h3>
                  Any other project ideas or IP you’d like us to consider?
                </h3>
                <label className={style.application_2_form_input}>
                  <input type="text" />
                </label>
                <hr />
              </div>
              <div className={style.application_2_form}>
                <h3>
                  Please upload supporting information such as a PDF of a
                  research plan with preliminary data.
                </h3>
                <label className={style.application_3_form_input}>
                  <input type="submit" value="Attach files" />
                </label>
              </div>
            </div>
            <div className={style.maina}>
              <div className={style.main_link_maina}>
                <Link href="/">
                  <a className={style.link_maina}>
                    <span>Submit Application</span>
                    <hr className={style.sec_hr_maina} />
                  </a>
                </Link>
              </div>
              <div className={style.mania_arrow}>
                <Image src="/Arrow15.png" height="17px" width="18.38px" />
              </div>
            </div>
          </div>
        </form>
      </section>
      <div className={style.mania_footer}>
        <section className={style.changing_world}>
          <div>
            <h1>Be a part of changing the world</h1>
            <p>
              Keep energy researches afloat with us as we build a future for
              context-based energy in emerging markets
            </p>
            <div className={style.changing_world_img}>
              <div>
                <Image src="/whiteDs.png" height="46px" width="44px" />
              </div>
              <div>
                <Image src="/whiteTL.png" height="46px" width="44px" />
              </div>
              <div>
                <Image src="/whiteMD.png" height="46px" width="44px" />
              </div>
              <div>
                <Image src="/whiteYT.png" height="46px" width="44px" />
              </div>
              <div>
                <Image src="/whiteTW.png" height="46px" width="44px" />
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer>
        <div className={style.blue_footer}>
          <div className={style.bg_footer}>
            <div className={style.sm_footer}>
              <div className={style.ls_footer}>
                <div>
                  <h5>Offices</h5>
                  <p>London:</p>
                  <p>One Heddon St, Regent Street,</p>
                  <p>London, W1B 4BD</p>
                </div>
                <div className={style.mid}>
                  <p>Spain:</p>
                  <p>6 Carrer de l’Architecte, </p>
                  <p>18016, Barcelona.</p>
                </div>
              </div>
              <div className={style.link_footer}>
                <Link href="/">
                  <a>
                    <h5>Kayce DAO</h5>
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <h5>Imprint</h5>
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <h5>Whitepaper</h5>
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <h5>Apply for Funding</h5>
                  </a>
                </Link>
              </div>
            </div>
            <div className={style.sm_footer}>
              <div className={style.ls_footer}>
                <div>
                  <h5>Support</h5>
                  <Link href="/">
                    <a>
                      <p>email@kayce.com</p>
                    </a>
                  </Link>
                </div>
                <div className={style.img_footer}>
                  <Image src="/bglogo.png" height="121px" width="151px" />
                </div>
              </div>
              <div className={style.bg_link_footer}>
                <Link href="/">
                  <a>
                    <span>
                      Dashboard{' '}
                      <Image
                        className={style.Image}
                        src="/Arrowwhite.png"
                        width="10.37px"
                        height="10.27px"
                      />
                    </span>
                    <hr className={style.footer_hr} />
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <span>
                      Get $KAYCE{' '}
                      <Image
                        className={style.Image}
                        src="/Arrowwhite.png"
                        width="10.37px"
                        height="10.27px"
                      />
                    </span>
                    <hr className={style.footer_hr} />
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <span>
                      Launch the DAO{' '}
                      <Image
                        className={style.Image}
                        src="/Arrowwhite.png"
                        width="10.37px"
                        height="10.27px"
                      />
                    </span>
                    <hr className={style.footer_hr} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className={style.final_footer}>
            <p>© 2022 Kayce. All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Application
