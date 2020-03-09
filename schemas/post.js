export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }]
    },
    {
      name: 'publishedAt',
      title: 'Publish Date',
      type: 'datetime',
      initialValue: () => ({
        publishedAt: new Date().toISOString()
      }),
      validation: Rule => Rule.required()
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      date: 'publishedAt'
    },
    prepare(selection) {
      const { author, date } = selection;

      const formatDate = date => {
        if (date !== undefined) {
          const current = new Date(date);
          const yyyy = current.getFullYear();
          let mm = current.getMonth();
          let dd = current.getDate();
          if (dd < 10) {
            dd = '0' + dd;
          }

          if (mm < 10) {
            mm = '0' + mm;
          }

          return `${yyyy}-${mm}-${dd}`;
        } else {
          return null;
        }
      };

      const humanDate = formatDate(date);

      return Object.assign({}, selection, {
        subtitle: author && `Published ${humanDate} by ${author}`
      });
    }
  }
};
