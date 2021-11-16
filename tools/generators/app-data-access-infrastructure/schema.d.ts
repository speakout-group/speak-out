export interface InfrastructureGeneratorSchema {
  name: string;
}

export interface NormalizedSchema extends InfrastructureGeneratorSchema {
  format: string;
}

export interface Names {
  name: string;
  className: string;
  propertyName: string;
  constantName: string;
  fileName: string;
}

export interface TemplateOptions extends NormalizedSchema, Names {
  offsetFromRoot: string;
  entity: Names;
  type: Names;
  model: string;
  template: string;
}
