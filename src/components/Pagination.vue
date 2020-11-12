<template>
  <div class="pagination__container" v-if="pages > 1">
    <div v-click-away class="pagination" >
      <div class="pagination__first-btn" @click="firstPage" :class="{ disabled : activePage == 1}" v-if="pages > 3">{{ firstLabel }}</div>
      <div v-if="pageTrays.prevPageNumbers && pageTrays.prevPageNumbers.length > 0" class="pagination__more-option-container">
        <transition name="fade">
          <div class="pagination__more-option--previous" v-if="isMoreOptionPrevOpen">
            <div
              v-for="(prevPage, key) in pageTrays.prevPageNumbers"
              :key="key"
              @click="switchPage(prevPage)">
              {{ prevPage }}
            </div>
          </div>
        </transition>
        <div class="pagination__more-option--btn" @click="isMoreOptionPrevOpen = !isMoreOptionPrevOpen">
          <i></i>
          <i></i>
          <i></i>
        </div>
      </div>
      <div class="pagination__btn--previous" :class="{ disabled : activePage == 1}" @click="previousPage">
        <svg xmlns="http://www.w3.org/2000/svg" width="6.159" height="10.818" class="icon-arrow-left-sm" viewBox="0 0 6.159 10.818">
          <g transform="translate(0 10.818) rotate(-90)">
            <path id="Path_662" data-name="Path 662" d="M341.6,392.877l-4.659-4.658a.75.75,0,0,0-1.061,0l-4.658,4.658a.751.751,0,1,0,1.062,1.061l4.127-4.127,4.128,4.127a.75.75,0,1,0,1.061-1.061Z" transform="translate(-330.999 -387.999)" fill="rgba(0,0,0,0.9)"/>
          </g>
        </svg>
      </div>
      <div
        class="pagination__counter"
        :class="{ 'active': page === activePage}"
        @click="switchPage(page)"
        v-for="(page, key) in navigablePageNumber"
        :key="key">
        {{ page }}
      </div>
      <div class="pagination__btn--next" :class="{ disabled : isLastPage}" @click="nextPage">
        <svg xmlns="http://www.w3.org/2000/svg" width="6.159" height="10.818" class="icon-arrow-right-sm" viewBox="0 0 6.159 10.818">
          <g transform="translate(6.159 0) rotate(90)">
            <path id="Path_662" data-name="Path 662" d="M341.6,392.877l-4.659-4.658a.75.75,0,0,0-1.061,0l-4.658,4.658a.751.751,0,1,0,1.062,1.061l4.127-4.127,4.128,4.127a.75.75,0,1,0,1.061-1.061Z" transform="translate(-330.999 -387.999)" fill="rgba(0,0,0,0.9)"/>
          </g>
        </svg>
      </div>
      <div v-if="pageTrays.nextPageNumbers && pageTrays.nextPageNumbers.length > 0" class="pagination__more-option-container">
        <transition name="fade">
          <div class="pagination__more-option--next" v-if="isMoreOptionNextOpen">
            <div
              v-for="(nextPage, key) in pageTrays.nextPageNumbers"
              :key="key"
              @click="switchPage(nextPage)">
              {{ nextPage }}
            </div>
          </div>
        </transition>
        <div class="pagination__more-option--btn" @click="isMoreOptionNextOpen = !isMoreOptionNextOpen">
          <i></i>
          <i></i>
          <i></i>
        </div>
      </div>
      <div class="pagination__last-btn" @click="lastPage" :class="{ disabled : isLastPage}" v-if="pages > 3">{{ lastLabel }}</div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Pagination',
    props: {
      pages: {
        type: Number,
        required: true
      },
      currentPage: {
        type: [Number, String],
        required: true
      },
      perPageSize: {
        type: Number,
        required: true
      },
      hasVueRouter: {
        type: Boolean,
        default: false
      },
      firstLabel: {
        type: String,
        default: 'First'
      },
      lastLabel: {
        type: String,
        default: 'Last'
      },
    },
    directives: {
      clickAway: {
        bind(el, binding, vnode) {
          el.clickOutsideEvent = (event) => {
            if (!(el == event.target || el.contains(event.target))) {
              vnode.context.isMoreOptionPrevOpen = false;
              vnode.context.isMoreOptionNextOpen = false;
            }
          };
          document.body.addEventListener("click", el.clickOutsideEvent);
        },
        unbind(el) {
          document.body.removeEventListener(
            "click",
            el.clickOutsideEvent
          );
        }
      }
    },
    watch: {
      pages: {
        handler() {
          this.reloadPagination()
        },
        immediate: true
      }
    },
    data() {
      return {
        activePage: +this.currentPage,
        isLastPage: false,
        isMoreOptionPrevOpen: false,
        isMoreOptionNextOpen: false,
        pageNumbers: [],
        navigablePageNumber: [],
        firstLoad: false,
        pageSets: [],
        pageTrays: {}
      }
    },
    methods: {
      reloadPagination() {
        this.getPageNumbers()
        this.pageSets = this.groupPageNumbers()
        this.navigablePageNumber = this.pageSets[this.groupIndexOfCurrentPage()]
        this.pageTrays = this.getPrevAndNextPages()
        this.firstLoad = true
      },
      switchPage(page) {
        this.isLastPage = page === this.pages;
        this.activePage = page
        this.$emit('switch-page', page)

        if (!this.navigablePageNumber.includes(this.activePage)) {
          this.reloadPagination()
        }
        if (this.hasVueRouter) {
        this.$router.push({ ...this.$route, query: { ...this.$route.query, page } });
        }
      },
      firstPage() {
        this.switchPage(1)
      },
      lastPage() {
        this.switchPage(this.pages)
      },
      nextPage() {
        this.activePage++
        this.switchPage(this.activePage)
      },
      previousPage() {
        this.activePage--
        this.switchPage(this.activePage)
      },
      getPageNumbers() {
        this.pageNumbers = []
        for (let i = 1; i <= this.pages; i++) {
          this.pageNumbers.push(i)
        }
      },
      getPrevAndNextPages() {
        // get the index of the first number in pageNumbers array to set the last page number for previous page numbers
        let indexOfFirstNumberInPageNumber = this.pageNumbers.find(pn => pn == this.navigablePageNumber[0])
        let indexOfLastNumberInPageNumber = this.pageNumbers.find(pn => pn == this.navigablePageNumber[this.navigablePageNumber.length-1])

        // get the next page numbers outside from navigablePageNumber
        let nextPageNumbers = this.pageNumbers.slice(indexOfLastNumberInPageNumber, indexOfLastNumberInPageNumber+6)

        let startOfNumber = null
        // if indexOfFirstNumberInPageNumber exists, start the prevPageNumbers by it. If not, start from 0
        if(this.pageNumbers[indexOfFirstNumberInPageNumber-7]) {
          startOfNumber = indexOfFirstNumberInPageNumber-7
        } else {
          startOfNumber = 0
        }
        // get the previous page numbers
        let prevPageNumbers = this.pageNumbers.slice(startOfNumber, indexOfFirstNumberInPageNumber-1)

        return {
          nextPageNumbers,
          prevPageNumbers
        }
      },
      groupPageNumbers() {
        return this.pageNumbers.reduce((acc, val, i) => {
          let index = Math.floor(i / this.perPageSize)
          let page = acc[index] || (acc[index] = [])
          page.push(val)

          return acc
        }, [])
      },
      groupIndexOfCurrentPage() {
        let newSet = []

        for(let pn of this.pageSets) {
          newSet.push(pn)
          if(pn.find(e => e == this.activePage)) break
        }

        return newSet.length-1
      }
    }
  }
</script>


<style lang="scss">
@import "https://fonts.googleapis.com/css2?family=Poppins&display=swap";
$pagination--primary: #293AD3;

.pagination {
  font-family: 'Poppins', sans-serif;
  position: sticky;
  bottom: 15px;
  max-width: 100%;
  background: #fff;
  display: inline-flex;
  padding: 6px 10px;
  justify-content: space-between;
  border-radius: 50px;
  align-items: center;
  user-select: none;
  &__container {
    margin-top: auto;
    text-align: center;
    z-index: 2;
  }
  .disabled {
    pointer-events: none;
    opacity: .4;
  }
  &__counter {
    transition: .15s;
    cursor: pointer;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    color: $pagination--primary;
    font-size: 13px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 2px;

    &.active {
      background-color: $pagination--primary;
      color: #fff;
      border-radius: 50%;

      &:hover {
        background-color: $pagination--primary;
      }
    }
    &:hover {
      background-color: #EFEEFD;
    }
  }
  &__btn {
    &--previous,
    &--next {
      padding: 5px;
      cursor: pointer;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;

      path {
        transition: .15s;
        fill: currentColor;
      }

      &:hover {
        //background: #EFEEFD;
        color: $pagination--primary;
      }
    }
  }
  &__more-option {
    &-container {
      padding: 5px;
      cursor: pointer;
      position: relative;
    }
    &--btn {
      color: #D0D0D0;
      i {
        width: 4px;
        height: 4px;
        display: inline-block;
        background: #E4E4E4;
        border-radius: 2px;
        margin: 3px 1px;
      }
    }
    &--previous,
    &--next {
      display: grid;
      grid-template-columns: auto auto auto;
      position: absolute;
      z-index: 100;
      background: #fff;
      color: $pagination--primary;
      box-shadow: 0 20px 30px 0 rgba(28,24,88,.15);
      width: auto;
      padding: 9px;
      border-radius: 10px;
      top: auto;
      bottom: 100%;
      margin-bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      font-size: 13px;

      div {
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        transition: .2s;
        margin: 0 2px;
        border-radius: 50%;

        &:hover {
          background-color: #EFEEFD;
        }
      }

      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-top-color: #fff;
        border-bottom: 0;
        margin-left: -10px;
        margin-bottom: -10px;
      }
    }
  }
  &__first-btn,
  &__last-btn {
    transition: .15s;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;

    &:hover {
      color: $pagination--primary;
    }
  }
  &__first-btn { margin-right: 10px; padding-left: 20px;}
  &__last-btn { margin-left: 10px; padding-right: 20px;}
}

</style>