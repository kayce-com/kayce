import Link from 'next/link'
import Image from 'next/image'
import style from '../../styles/Home.module.css'

const Faq = () => {
  return (
    <div className={style.yt}>
      <section className={style.faq_main}>
        <h1>FAQs</h1>
        <div className={style.faq_main_container}>
          <div className={style.faq_main_container_bg}>
            <div className={style.faq_main_container_div}>
              <p>Who can apply? </p>
            </div>
            <div className={style.faq_main_container_div_arrow}>
              <Image src="/up.png" height="11.02px" width="17.28px" />
            </div>
          </div>
          <div className={style.faq_main_container_bg}>
            <div className={style.faq_main_container_div_p}>
                <p>
                  All researchers are welcome to apply, including students. You
                  should have access to appropriate facilities for the work you
                  propose. We prioritise projects with a clear pathway to
                  generating intellectual property and potential commercial
                  value. Not sure whether your project is a fit? Our discord
                  community can help.
                </p>
            </div>
          </div>
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
    </div>
  )
}

export default Faq
