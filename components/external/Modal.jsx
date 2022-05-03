import Link from 'next/link'
import Image from 'next/image'
import style from '../../styles/Home.module.css'

const Modal = () => {
  return (
    <div>
      <section className={style.modal_form}>
        <div className={style.modal_form_bg}>
          <span className={style.Founding_im}>
            <Image src="/x.png" height="16px" width="16px" />
          </span>
          <form>
            <div className={style.modal_form_sm}>
              <div className={style.modal_form_sm_ctr}>
                <h1>Join Grant</h1>
                <div className={style.application_form}>
                  <h3>Name *</h3>
                  <label className={style.application_form_input}>
                    <input type="text" />
                  </label>
                  <hr />
                </div>
                <div className={style.application_form}>
                  <h3>Email *</h3>
                  <label className={style.application_form_input}>
                    <input type="text" />
                  </label>
                  <hr />
                </div>
                <div className={style.application_form}>
                  <h3>LinkedIn / Professional URL*</h3>
                  <label className={style.application_form_input}>
                    <input type="text" />
                  </label>
                  <hr />
                </div>
              </div>
              <div className={style.modal_form_sm_ctr}>
                <div className={style.application_form}>
                  <h3 className={style.application_form_input_h3}>
                    Motivation for Joining The Project *
                  </h3>
                  <label className={style.application_form_input_y}>
                    <input type="text" />
                  </label>
                  <hr className={style.input_y} />
                </div>
                <div className={style.application_form_input_f}>
                  <Link href="/">
                    <a>
                      <span>
                        Submit Application
                        <Image
                          className={style.Image}
                          src="/Arrowwhite.png"
                          width="10.37px"
                          height="10.27px"
                        />
                      </span>
                      <hr className={style.f_hr} />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Modal
