import type { PipelineCellProps } from "@/models";

export class PipelineCellViewModel {
  constructor(private props: PipelineCellProps) {}

  get ID() {
    return this.props.ID;
  }

  get title() {
    return this.props.title;
  }

  get lead() {
    return this.props.leadInfo;
  }

  get description() {
    return this.props.description;
  }

  get capital() {
    return this.props.capital ?? "N/A";
  }

  get avatarURL() {
    return this.props.avatarURL;
  }

  get leadName() {
    return this.props.leadName;
  }

  get companyName() {
    return this.props.companyName;
  }

  get status() {
    return this.props.status;
  }

  get leadType() {
    return this.props.leadType;
  }

  get addedAgo() {
    return new Date();
  }

  get dueIn() {
    return new Date();
  }

  get isDragging() {
    return this.props.isDragging;
  }

  onClick = () => {
    this.props.onClick?.(this.props.title);
  };

  // onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
  // this.props.onDragStart?.(this.props.title, this.props.status);
  // e.dataTransfer.effectAllowed = "move";
  // };
}
