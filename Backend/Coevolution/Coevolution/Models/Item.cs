﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Coevolution.Models
{
    public class Item
    {
        [Key]
        public int Id { get; set; }
        public string Key { get; set; }
        public virtual Item Parent { get; set; }
        public long Date { get; set; }
        public bool Deleted { get; set; }

        public List<Label> Labels { get; set; }
        public List<Note> Notes { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public Item()
        {
            Labels = new List<Label>();
            Notes = new List<Note>();
        }

        public virtual DtoItem ToDto(){
            throw new NotImplementedException("ToDto should only be called on subclasses.");
        }
    }
}