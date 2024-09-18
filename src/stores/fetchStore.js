import { defineStore } from 'pinia';

export const useStore = defineStore('apiStore', {
    state: () => ({
        loading: true,
        visited: false,
        whiteHeader: false,
        data: [],
        settings: [],
      }),
      getters: {
      },
      actions: {
        async fetchData(apiUrl, authToken) {
          this.loading = true;
          console.log(this.loading)
            try {
                const response = await fetch(`${apiUrl}/api/general?populate=deep,6` , {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                let data = await response.json();
                this.data = data.data.attributes.proyectos;
                
               
              }
              catch(error) {
                console.log(error);
              }
              finally {
                console.log(this.data);
                console.log("done")
                // console.log(this.loading)
                this.loading = false;
                console.log(this.loading)
              }
        },

        async fetchProject(apiUrl, authToken, slug) {
          this.loading = true;
          console.log(this.loading)
          try {

            const response = await fetch(`${apiUrl}/api/proyectos?filters[slug][$eq]=${slug}&populate=deep,6` , {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            let data = await response.json();
            this.data = data.data[0].attributes;

          }
          catch(error) {
            console.log(error);
          }
          finally {
            console.log(this.data);
            console.log("done")
            // console.log(this.loading)
            this.loading = false;
            console.log(this.loading)
          }
        },

        async fetchServices(apiUrl, authToken) {
          this.loading = true;
          console.log(this.loading)
          try {

            const response = await fetch(`${apiUrl}/api/service?populate=deep,6` , {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            let data = await response.json();
            this.data = data.data.attributes.servicios;

          }
          catch(error) {
            console.log(error);
          }
          finally {
            console.log(this.data);
            console.log("done")
            // console.log(this.loading)
            this.loading = false;
            console.log(this.loading)
          }
        },

        async fetchAbout(apiUrl, authToken) {
          this.loading = true;
          console.log(this.loading)
          try {

            const response = await fetch(`${apiUrl}/api/about?populate=deep,6` , {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            let data = await response.json();
            this.data = data.data.attributes;

          }
          catch(error) {
            console.log(error);
          }
          finally {
            console.log(this.data);
            console.log("done")
            // console.log(this.loading)
            this.loading = false;
            console.log(this.loading)
          }
        },

        async fetchCategory(apiUrl, authToken, category) {
          this.loading = true;
          console.log(this.loading)
            try {
                const response = await fetch(`${apiUrl}/api/${category}?populate=deep,6` , {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                let data = await response.json();
                this.data = data.data.attributes.proyectos;
                
               
              }
              catch(error) {
                console.log(error);
              }
              finally {
                console.log(this.data);
                console.log("done")
                // console.log(this.loading)
                this.loading = false;
                console.log(this.loading)
              }
        },

        async fetchSettings(apiUrl, authToken) {
          this.loading = true;
          console.log(this.loading)
            try {
                const response = await fetch(`${apiUrl}/api/setting` , {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                let settings = await response.json();
                this.settings = settings.data.attributes;
                
               
              }
              catch(error) {
                console.log(error);
              }
              finally {
                console.log(this.settings);
                console.log("done")
              }
        },

        setIsInInfoRoute(value) {
          this.whiteHeader = value;
        },

        toTop() {
          window.scrollTo({ top: 0, behavior: 'instant' });
          console.log('top')
        },

        storage() {
          // Verificar si el usuario ya ha visitado la página
          let visit = sessionStorage.getItem('firstVisit');
      
          if (!visit) {
              this.visited = false
              sessionStorage.setItem('firstVisit', 'true');
          } else {
            this.visited = true
              console.log("Ya has visitado esta página antes.");
          }
        },

        getClass(view) {
          let columnsClass = {
            col1: 'col-span-1',
            col2: 'col-span-2',
            col3: 'col-span-3',
            col4: 'col-span-4',
            col5: 'col-span-5',
            col6: 'col-span-6',
            col7: 'col-span-7',
            col8: 'col-span-8',
            col9: 'col-span-9',
            col10: 'col-span-10',
            col11: 'col-span-11',
            col12: 'col-span-12',
            col13: 'col-span-13'
          };

          let startColumnClass = {
            col1: 'col-start-1',
            col2: 'col-start-2',
            col3: 'col-start-3',
            col4: 'col-start-4',
            col5: 'col-start-5',
            col6: 'col-start-6',
            col7: 'col-start-7',
            col8: 'col-start-8',
            col9: 'col-start-9',
            col10: 'col-start-10',
            col11: 'col-start-11',
            col12: 'col-start-12',
            col13: 'col-start-13'
          };

          let endColumnClass = {
            col1: 'col-end-1',
            col2: 'col-end-2',
            col3: 'col-end-3',
            col4: 'col-end-4',
            col5: 'col-end-5',
            col6: 'col-end-6',
            col7: 'col-end-7',
            col8: 'col-end-8',
            col9: 'col-end-9',
            col10: 'col-end-10',
            col11: 'col-end-11',
            col12: 'col-end-12',
            col13: 'col-end-13',
            col14: 'col-end-14'
          };

          let gridClass = {
            col1: 'grid-cols-1',
            col2: 'grid-cols-2',
            col3: 'grid-cols-3',
            col4: 'grid-cols-4',
            col5: 'grid-cols-5',
            col6: 'grid-cols-6',
            col7: 'grid-cols-7',
            col8: 'grid-cols-8',
            col9: 'grid-cols-9',
            col10: 'grid-cols-10',
            col11: 'grid-cols-11',
            col12: 'grid-cols-12',
            col13: 'grid-cols-13'
          };

          return [
            columnsClass[view.Columns] || '',
            startColumnClass[view.startColumn] || '',
            endColumnClass[view.endColumn] || '',
            gridClass[view.Columns] || ''
          ].join(' ').trim();
        }
      }
})